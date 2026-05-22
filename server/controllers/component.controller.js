import User from "../models/user.model.js";
import Component from "../models/component.model.js";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export const saveComponent = async (req, res) => {
  try {
    const { name, code, props } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.role === "admin") {
      const existing = await Component.findOne({ name, visibility: "public" });
      if (existing) {
        return res.status(400).json({
          message: "Admin is not able to create duplicate component name.",
        });
      }
    }

    if (user.role !== "admin") {
      const existing = await Component.findOne({
        name,
        owner: req.userId,
      });

      if (existing) {
        return res.status(400).json({
          message: "You already have a component with this name",
        });
      }
    }

    const component = await Component.create({
      name,
      code,
      props,
      owner: req.userId,
    });
    return res.status(200).json(component);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const publishComponent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized access: only admin can publish any component",
      });
    }

    const { componentId } = req.body;

    const component = await Component.findById(componentId);

    if (!component) {
      return res.status(404).json({
        message: "Component not found",
      });
    }

    if (
      user.role !== "admin" &&
      component.owner.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({
        message: "You can only publish your own components",
      });
    }

    const libPath = path.join(process.cwd(), "../library");

    const componentDir = path.join(libPath, "src/components", component.name);

    const componentFile = path.join(componentDir, `${component.name}.jsx`);

    const indexFile = path.join(libPath, "src/index.js");

    //create component's folder in library folder
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    //write code in it
    fs.writeFileSync(componentFile, component.code);

    //read file
    let indexContent = fs.readFileSync(indexFile, "utf8");

    const exportLine = `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`;

    // prevent duplicate export
    if (!indexContent.includes(exportLine)) {
      fs.appendFileSync(indexFile, `\n${exportLine}\n`);
    }

    //clean and build
    console.log("Cleaning old build...");

    const distPath = path.join(libPath, "dist");

    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
    }

    //build library
    console.log("Building library...");

    execSync("npm run build", {
      cwd: libPath,
      stdio: "inherit",
    });

    //update version
    console.log("Updating version...");

    execSync("npm version patch --no-git-tag-version", {
      cwd: libPath,
      stdio: "inherit",
    });

    //publish to npm
    console.log("Publishing to npm...");

    execSync("npm publish --access public", {
      cwd: libPath,
      stdio: "inherit",
    });

    component.visibility = "public";
    component.npmPackage = `genui-library`;

    await component.save();

    return res
      .status(200)
      .json({ message: "Component published successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    if (!components) {
      return res.status(404).json({ message: "components are not found" });
    }

    return res.status(200).json(components);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `components are not able to get: ${error.message}` });
  }
};
