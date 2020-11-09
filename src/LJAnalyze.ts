import superagent from 'superagent'
import cheerio from 'cheerio'
import { Analyzer } from './crowller'

interface House {
    title: string;
    size: string;
    address: string;
    time: string;
    price: number;
}
interface Content {
    [propName: string]: House[];
}

// 接口实现 使用组合模式 业务独立分开 链家的爬虫
export default class LJAnalyze implements Analyzer {

    private baseUrl = `https://wh.centanet.com/xinfang/?key=`
    private dataSource: Content = {}
    private static instance: LJAnalyze;

    // 单例模式
    static getInstance(keys: Array<string>) {
        if (!LJAnalyze.instance) {
            LJAnalyze.instance = new LJAnalyze(keys)
        }
        return LJAnalyze.instance
    }

    private constructor(private keys: Array<string>) { }

    async getRowHtml(key: string) {
        const url = this.baseUrl + key
        const html = await superagent(encodeURI(url))
        return html.text
    }

    async analyze() {
        for (const key of this.keys) {
            const html = await this.getRowHtml(key)
            const houseInfo = this.getHouseInfo(html)
            this.dataSource[key] = houseInfo
        }
        return this.dataSource
    }

    getHouseInfo(html: string): House[] {
        const $ = cheerio.load(html)
        const newRoomTtems = $('.newRoom-item')
        const resultInfo: House[] = []
        newRoomTtems.map((index, item) => {
            const title = $(item).find(".room-mid h5 a").text()
            const size = $(item).find(".room-mid p .mrl_6").text()
            const address = $(item).find(".room-mid .f6 span").text()
            const time = $(item).find('.room-mid p').eq(2).text()
            const price = parseInt($(item).find(".average-price strong").text())
            resultInfo.push({
                title,
                size,
                address,
                time,
                price
            })
        })
        return resultInfo
    }
}