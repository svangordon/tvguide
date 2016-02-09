# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class Emission(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    desc = scrapy.Field()
    time = scrapy.Field()
    day = scrapy.Field()
    year = scrapy.Field()
    month = scrapy.Field()
    network = scrapy.Field()
    # language = scrapy.Field()
    country = scrapy.Field()
    # timezone = scrapy.Field()