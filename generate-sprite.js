import path from "path";
import fs from "fs";
import SVGSpriter from "svg-sprite";

const generateSprite = () => {
  console.log("Starting sprite generation...");

  const spriter = new SVGSpriter({
    mode: {
      symbol: {
        dest: ".", // Директорія для вихідного файлу
        sprite: "sprite.svg", // Назва спрайта
      },
    },
    shape: {
      id: {
        separator: "-", // Роздільник для ID
      },
    },
    svg: {
      xmlDeclaration: false, // Прибираємо декларацію <?xml ... ?>
      doctypeDeclaration: false, // Прибираємо <!DOCTYPE svg>
    },
  });

  const __dirname = path.resolve();
  const iconsDir = path.join(__dirname, "src", "assets", "icons");

  // Перевірка існування папки
  if (!fs.existsSync(iconsDir)) {
    console.error(`Directory not found: ${iconsDir}`);
    return;
  }

  console.log(`Icons directory found: ${iconsDir}`);

  const svgFiles = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"));
  if (svgFiles.length === 0) {
    console.error("No SVG files found in the icons directory.");
    return;
  }

  console.log(`Found ${svgFiles.length} SVG files: ${svgFiles.join(", ")}`);

  svgFiles.forEach((file) => {
    console.log(`Adding file to spriter: ${file}`);
    spriter.add(
      path.join(iconsDir, file),
      file,
      fs.readFileSync(path.join(iconsDir, file), { encoding: "utf-8" })
    );
  });

  // Генеруємо спрайт
  spriter.compile((error, result) => {
    if (error) {
      console.error("Error generating sprite:", error);
      return;
    }

    const outputPath = path.join(__dirname, "src", "assets", "sprite.svg");
    fs.writeFileSync(outputPath, result.symbol.sprite.contents);
    console.log(`SVG sprite generated successfully: ${outputPath}`);
  });

  console.log("Generating sprite...");
  // Ваш існуючий код
};

// Запустити функцію генерації
generateSprite();
