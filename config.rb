###
# Blog settings
###

set :source, 'prebuild'
set :global_path, ''
set :assets_path, '/'

# Time.zone = "UTC"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "blog/post/{title}.html"
  # Matcher for blog source files
  blog.sources = "blog/articles/{title}.html"
  blog.taglink = "blog/tag/{tag}.html"
  blog.layout = "layout_blog_post"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

page "/index.html", :layout => 'layout_intro_da'
page "/da*", :layout => 'layout_intro_da'
page "/en*", :layout => 'layout_intro_en'
page "/feed.xml", layout: false
page "/blog/post*", :layout => "layout_blog_post"
page "/blog.html", :layout => "layout_blog"
page "/blog/tag*", :layout => "layout_blog"

page "/20*", :layout => "layout_blog"

activate :directory_indexes
ignore 'script/*'

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compressed
#   config.environment = :production
#end




###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'styles'

set :js_dir, 'js'

set :images_dir, 'images'



# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  #activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

ignore 'js/*'