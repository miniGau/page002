import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
    let cfgFile = ".dev.yaml" // 默认是dev
    if (process.env.NODE_ENV == 'production') {
        cfgFile = ".prd.yaml"
    }

    return yaml.load(
      readFileSync(join(__dirname, cfgFile), 'utf8'),
    ) as Record<string, any>;
  };