import { defineConfig } from "vite";
import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import SVGSpriter from "svg-sprite";
import { log } from "console";
console.log("Vite config loaded!");
// Функція генерації спрайта
const generateSprite = () => {
  console.log("Generating is started");

  const spriter = new SVGSpriter({
    mode: {
      symbol: {
        dest: ".",
        sprite: "sprite.svg", // Назва спрайта
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  });

  const iconsDir = path.join(process.cwd(), "src", "assets", "icons");
  fs.readdirSync(iconsDir).forEach((file) => {
    if (file.endsWith(".svg")) {
      spriter.add(
        path.join(iconsDir, file),
        file,
        fs.readFileSync(path.join(iconsDir, file), { encoding: "utf-8" })
      );
    }
  });

  spriter.compile((error, result) => {
    if (error) {
      console.error("Error generating sprite:", error);
      return;
    }

    const outputPath = path.join(process.cwd(), "src", "assets", "sprite.svg");
    fs.writeFileSync(outputPath, result.symbol.sprite.contents);
    console.log(`SVG sprite generated: ${outputPath}`);
  });
};

// Експорт конфігурації Vite
export default defineConfig({
  plugins: [
    {
      name: "watch-svg-sprite",
      configureServer(server) {
        console.log("configureServer is running!");

        const iconsDir = "src/assets/icons/*.svg";
        const watcher = chokidar.watch(`${iconsDir}/*.svg`, {
          persistent: true,
          ignoreInitial: false, // Відстежувати всі наявні файли при запуску
          usePolling: true, // Використання полінгу для стабільності
          interval: 100, // Інтервал перевірки змін
        });

        watcher.on("all", (event, filePath) => {
          console.log(`Event: ${event}, File: ${filePath}`);
          generateSprite(); // Викликаємо функцію генерації спрайта
          server.ws.send({ type: "full-reload" });
        });

        console.log(`Watching files: ${iconsDir}`);
      },
    },
  ],
});
