from urlparse import urlparse, urljoin

''' download the image from the article '''




def get_absolute_url(article_url, image_url):
    urlcomponent = urlparse(article_url)
    host = urlcomponent.netloc

    image_url = image_url.strip()

    if image_url.startswith("http://") \
        or image_url.startswith("https://"):
        return image_url

    if image_url.startswith("/"):
        return host + image_url

    return urljoin(article_url, image_url)


def change_image(html_content):
    pass

def download_image(image_url, new_name):
    pass


