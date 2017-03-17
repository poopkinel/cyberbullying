import re  # Regular Expression library (https://docs.python.org/3.6/howto/regex.html)
import json

URGENT_WORDS = open(r"C:\Users\Ophe\Documents\kaveret\urgent_words.txt","rb").read().splitlines()
ABUSIVE_WORDS = open(r"C:\Users\Ophe\Documents\kaveret\abusive_words.txt","rb").read().splitlines()
post = open(r"C:\Users\Ophe\Documents\kaveret\post_html.txt")

def extract_post_text(post):
    text_post_pattern = r'<div class="_5pbx userContent" data-ft="{&quot;tn&quot;:&quot;K&quot;}"><div dir="rtl" class="_5wj-" lang="he"><div class="_58jw"><p>(?P<word>.*?)</p>'
    post_text = re.findall(text_post_pattern,
                           post)[0].decode('cp1255').encode('utf8')
    return post_text

def find_bad_words(post_text):
    " returns the bad words found in post_text."
    print 'URGENT_WORDS:',URGENT_WORDS
    print 'ABUSIVE_WORDS:',ABUSIVE_WORDS
    bad_words = {'urgent_words':[], 'abusive_words':[]}
    for word in URGENT_WORDS:
        print 'word:',word
        print post_text
        print word in post_text
        if word in post_text:
            bad_words['urgent_words'].append(word)
    for word in ABUSIVE_WORDS:
        if word in post_text:
            bad_words['abusive_words'].append(word)
    return bad_words

def mark_post(post):
    """Parameter post(str):
    HTML of post.
    writes to a file the ABUSIVE_WORDS and URGENT_POSTS (from the lists)
    that are found in the post
    """    
    post_text = extract_post_text(post)
    print 'post_text:',post_text
    bad_words_found = find_bad_words(post_text)
    return bad_words_found

def main():
    TEST = '<div class="_5pbx userContent" data-ft="{&quot;tn&quot;:&quot;K&quot;}"><div dir="rtl" class="_5wj-" lang="he"><div class="_58jw"><p>\xee\xe9\xec\xe9\xed \xf8\xf2\xe5\xfa \xeb\xee\xe5 \xf1\xeb\xe9\xef \xf8\xe5\xe1\xe4 \xec\xee\xe5\xfa</p></div></div></div>'
    return mark_post(TEST)

out = main()
f = open(r'C:\Users\Ophe\Documents\kaveret\words_found_output.json','wb')
f.write(json.dumps(out))
f.close()
