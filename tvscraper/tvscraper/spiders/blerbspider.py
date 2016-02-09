# run with scrapy crawl blerb -o items.json

from scrapy.spiders import Spider
from scrapy.selector import Selector

from tvscraper.items import Emission


class BlerbSpider(Spider):
    name = "blerb"
    allowed_domains = ["blerb.org"]
    start_urls = [
        "http://bleb.org/tv/channel.html?ch=bbc1&day=-1",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=0",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=1",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=2",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=3",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=4",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=5",
        "http://bleb.org/tv/channel.html?ch=bbc1&day=6",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=-1",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=0",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=1",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=2",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=3",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=4",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=5",
        "http://bleb.org/tv/channel.html?ch=bbc2&day=6",
        "http://bleb.org/tv/channel.html?ch=ch4&day=-1",
        "http://bleb.org/tv/channel.html?ch=ch4&day=0",
        "http://bleb.org/tv/channel.html?ch=ch4&day=1",
        "http://bleb.org/tv/channel.html?ch=ch4&day=2",
        "http://bleb.org/tv/channel.html?ch=ch4&day=3",
        "http://bleb.org/tv/channel.html?ch=ch4&day=4",
        "http://bleb.org/tv/channel.html?ch=ch4&day=5",
        "http://bleb.org/tv/channel.html?ch=ch4&day=6",
        "http://bleb.org/tv/channel.html?ch=five&day=-1",
        "http://bleb.org/tv/channel.html?ch=five&day=0",
        "http://bleb.org/tv/channel.html?ch=five&day=1",
        "http://bleb.org/tv/channel.html?ch=five&day=2",
        "http://bleb.org/tv/channel.html?ch=five&day=3",
        "http://bleb.org/tv/channel.html?ch=five&day=4",
        "http://bleb.org/tv/channel.html?ch=five&day=5",
        "http://bleb.org/tv/channel.html?ch=five&day=6"
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
        emissions = sel.css("table tr")
        header = sel.css('#content h2::text').extract()[0].split(' ');
        year = header.pop();
        day = header.pop()
        month = header.pop()
        del header[0:2]
        header.reverse()
        del header[0:2]
        header.reverse()
        network = " ".join(header)



        items = []

        for show in emissions:
            item = Emission()
            item['title'] = show.css('td:last-child b::text').extract()
            item['time'] = show.css('td:first-child b::text').extract()
            item['desc'] = show.css('td:last-child::text').extract()
            item['day'] = day
            item['month'] = month
            item['year'] = year
            item['network'] = network
            items.append(item)

        return items
