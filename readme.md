<h1 align="center">**News 4 U**</h1>
<hr />
<h2 align="center">Purpose:</h2>

<h3 align="center">Build news website to display news headlines and news based on user input</h3>

<p align="center">
<img alt="News4U screenshot" src="https://user-images.githubusercontent.com/91299930/150699281-81e2edc4-f3e6-4d9b-8480-5470fa6c500f.jpg" width="680" height="100%">
    </p>


## Site Details:
As soon as user launches website then :
- User will side navigation on left to search news by keyword
- In middle of screen user will see subtitle as "TOP 10 US Headlines"
- User will see top 10 US headlines in English

When user search for specific news topic then :
- Subtitle will be replaced based on user input
- Top 10 US headlines will be removed
- User will see top 10 news based on search input
- User should be able to see following filters
    - Select number of articles to be displayed. Options are 10, 20, 30, 40, 50. Default and selected is 10

When user selects number of articles then based on selection number of articles should be displayed in main screen

By default search keyword is used in articles description and title and user has choice to select option to search keyword either in title or description. 

User will see search history which is saved in local storage

# User Story:
As a reader,
I should be able to search using most important topics/discusson of my interests,
so that I can keep up with the current events

### Acceptant Criteria
Given I opened the News4U Web
    Then I should be able to see top headlines and search bar
When I input specific keyword
    Then I should be able to see top 10 news articles related to entered keywprds
    And I should be able to see the clickable and image for those articles
    And a keyword should be displayed in search history and search result persist when page is loaded
When I click on the link
    Then I new window should be opened displaying article
When select publisher 
    Then my search result will have articles with selected publisher
When I choose between title or content
    Then search should reflect those changes
When I give input search between 10 to 20
    Then I should receive search result within those parameters




#### Technologies Used:
API Used: https://gnews.io/
API Used: https://youtube.googleapis.com/youtube/v3/
