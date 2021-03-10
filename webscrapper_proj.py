import requests, bs4, sys

#test link: https://dl.acm.org/doi/10.1145/1240624.1240704
#in command line enter -> python3 webscrapper_proj.py https://dl.acm.org/doi/10.1145/1240624.1240704

if len(sys.argv) > 1:
   paperURL = sys.argv[1]

res = requests.get(paperURL)
res.raise_for_status()

soup = bs4.BeautifulSoup(res.text, 'html.parser')

#find list of author names
soup_info = soup.select('#sb-1')
findAuthors = soup_info[0].find_all('a', class_='author-name')

#get Name function 
def getAuthorsname(soup):
    soup_info1 = soup.select('#sb-1')
    findAuthors = soup_info1[0].find_all('a', class_='author-name')
    
    return findAuthors

#print only names 
for author in getAuthorsname(soup):
    print(author['title'] + " ")
print(" ")

#print only inst 
for author in getAuthorsname(soup):
    print(author.p.text + " ")
print(" ")


#get authors names and affiliations
for author in findAuthors:
    name = author['title']
    print(name + " ") 
    inst = author.p.text
    print(inst)
    print(" ")

#get abstract
abstract = soup.find('div', class_= 'abstractSection abstractInFull').text
print(abstract)
	


