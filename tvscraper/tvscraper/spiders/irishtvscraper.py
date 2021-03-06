# run with scrapy crawl irishtv -o irishTvData.json

from scrapy.spiders import Spider
from scrapy.selector import Selector

from tvscraper.items import Emission


class IrishSpider(Spider):
    name = "irishtv"
    allowed_domains = ["irishtv.ie"]
    start_urls = [
        "http://information.tv/IrishTV/schedule.php?day=-3",
        'http://information.tv/IrishTV/schedule.php?day=-2',
        'http://information.tv/IrishTV/schedule.php?day=-1',
        'http://information.tv/IrishTV/schedule.php?day=0',
        'http://information.tv/IrishTV/schedule.php?day=1',
        'http://information.tv/IrishTV/schedule.php?day=2',
        'http://information.tv/IrishTV/schedule.php?day=3',
        'http://information.tv/IrishTV/schedule.php?day=4'
    ]

    def parse(self, response):
        """
        The lines below is a spider contract. For more info see:
        http://doc.scrapy.org/en/latest/topics/contracts.html

        @url http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/
        @scrapes name
        """
        sel = Selector(response)
        # sites = sel.xpath('//ul[@class="directory-url"]/li')
        


        # .schedule-block > tbody > tr

        emissions = sel.css(".schedule-block tr")
        date = response.css('.schedule-top-info::text').extract()[1].strip().split(' ');
        year = date.pop()
        month = date.pop()
        day = str(date.pop()).translate(None,'stndrdth')
        network = 'Irish TV'
        # header = sel.css('#content h2::text').extract()[0].split(' ');
        # year = header.pop();
        # day = header.pop()
        # month = header.pop()
        # del header[0:2]
        # header.reverse()
        # del header[0:2]
        # header.reverse()
        # network = " ".join(header)



        items = []

        for show in emissions:
            item = Emission()
            item['title'] =" ".join(show.css('.description a::text').extract())
            item['time'] = show.css('td:first-child::text').extract()[0]
            # item['time'] = show.css('td:first-child b::text').extract()
            # item['desc'] = show.css('td:last-child::text').extract()
            item['desc'] = " ".join(show.css('.info::text').extract()).strip()
            item['day'] = day
            item['month'] = month
            item['year'] = year
            item['network'] = network
            item['country'] = 'Ireland'
            items.append(item)

        return items
