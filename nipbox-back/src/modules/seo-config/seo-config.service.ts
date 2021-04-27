import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { EditSeoConfigDto } from "./dto/edit-seo-config.dto";

@Injectable()
export default class SeoConfigService {
    async editConfig(dto: EditSeoConfigDto) {
        writeFileSync(resolve(__dirname, '../../../page.config.json'), JSON.stringify(dto));
        return true;
    }

    async getConfig() {
        const data = JSON.parse(readFileSync(resolve(__dirname, '../../../page.config.json')).toString())
        console.log(data)
        return data;
    }
}