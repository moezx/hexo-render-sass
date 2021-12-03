declare var hexo: any;



//  I M P O R T S

import fs from "graceful-fs";
import sass from "sass";



//  P R O G R A M

const renderer = (data: any, options: any, callback: any) => {
  const cssOutputFile = "./public/css/style.css";

  sass.render({
    file: data.path,
    outputStyle: "compressed",
    outFile: cssOutputFile
  }, (err: any, result: any) => {
    if (!err) {
      fs.writeFile(cssOutputFile, result.css, (err: any) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(`Generated: ${cssOutputFile}`);
        return;
      });
    } else {
      console.log(err);
    }

    callback(null, result.css.toString());
  });
};



//  E X P O R T S

hexo.extend.renderer.register("scss", "css", renderer);
hexo.extend.renderer.register("sass", "css", renderer);
