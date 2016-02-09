import scrapy

class TestSpider(scrapy.Spider):
	name = 'test'
	allowed_domains = ['bleb.org']
	start_urls = [
		"http://doc.scrapy.org/en/latest/_static/selectors-sample1.html"
	]

	def parse(self, response):	
		title = response.selector.xpath('//title/text()')
		images = respons.selector.css('#images > a::text()')