import { EditSeoConfigDto } from "./dto/edit-seo-config.dto";
export default class SeoConfigService {
    editConfig(dto: EditSeoConfigDto): Promise<boolean>;
    getConfig(): Promise<any>;
}
