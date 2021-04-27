import { EditSeoConfigDto } from "./dto/edit-seo-config.dto";
import SeoConfigService from "./seo-config.service";
export default class SeoConfigController {
    private seoConfigService;
    constructor(seoConfigService: SeoConfigService);
    editSeoConfig(dto: EditSeoConfigDto): Promise<boolean>;
    getSeoConfig(): Promise<any>;
}
