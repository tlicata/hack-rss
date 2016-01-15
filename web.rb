require 'open-uri'
require 'rss'
require 'sinatra'

get '/' do
  open('https://news.ycombinator.com/rss') do |rss|
    erb :index, locals: {feed: RSS::Parser.parse(rss)}
  end
end
