import fs from 'fs'
import path from 'path'
import LJAnalyze from './LJAnalyze';

export interface Analyzer {
    analyze: (html: string, filepath: string) => {};
}

class Crowller {
    constructor(private ljAnalyze: LJAnalyze) {
        this.getInitSpider()
    }

    async getInitSpider() {
        const dataSource = await this.ljAnalyze.analyze()
        this.writeFileSync(JSON.stringify(dataSource))
    }

    writeFileSync(fileContent: string) {
        const filepath = path.resolve(__dirname, '../data/data.json')
        fs.writeFileSync(filepath, fileContent)
    }
}

const addressURL: Array<string> = ['江夏', '武昌'];
const ljAnalyze = LJAnalyze.getInstance(addressURL)
new Crowller(ljAnalyze)

