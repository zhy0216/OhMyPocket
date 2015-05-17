## define whoose schema

from whoosh.fields import SchemaClass, TEXT, KEYWORD, ID, STORED
from jieba.analyse import ChineseAnalyzer

class ArticleSchema(SchemaClass):
    title = TEXT(stored=True)
    article_id = ID(stored=True, unique=True)
    content = TEXT(analyzer=ChineseAnalyzer())
