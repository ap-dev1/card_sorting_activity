## Know thyself

Live demo: 

### Overview

The app was inspired by the Personal Values Card Sorting activity - used in corporate coaching and therapeutic settings (links at the end). The activity is centered around values one deems important, like *competence* or *honesty*, and specific strategies for enhancing those values in oneself. Each card contains the name of a value and its description, and the client is invited to sort them by importance. These choices serve as foundation for the next steps of the activity - beyond the scope of this app.

### Functionality:

This version allows clients to create accounts and log in securelly, to select cards from the deck and submit their choices ("a session"), and to review the values selected in previous sessions. 

| Log in |  | Create account |
| ----------- | - | ----------- |
| ![Landing Page](/front_end/public/screen01.png "Landing page") | - | ![Create account](/front_end/public/screen02.png "Create account") |


| Log in | | Create account | | Previous sessions | 
| ----------- | | ----------- | | ----------- |
| ![Landing Page](/front_end/public/screen01.png "Landing page") | | ![Create account](/front_end/public/screen02.png "Create account") | | ![Saved sessions](/front_end/public/screen04.png "Saved sessions") |


View and choose cards:
![Sorting activity page](/front_end/public/screen03.png "Sorting activity")



| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

| Syntax | Description |
| Header | Title |
| Paragraph | Text |


### Technical aspects

This is a React app, with an Express back end, that communicate via Axios. 
The front-end was enhanced using Styled Components, Semantic-ui-react, and Tachyos.

**Data** is stored as JSON, in three **DynamoDB** tables:
1. cards names and descriptions (client-independent info);
2. authentication: user email and hashed password (a valid email is *not* required, but the info must be unique);
3. client sessions: user email and saved sessions, stored as an array of strings;


Before the initial deployment - through AWS - *authentication* and *client sessions* were also stored in relational databases, using **RDS PostgreSQL**. This redundancy was implemented for practice purposes; the code was later commented out but is still included. 


#### Card sorting activity, usage examples:

<http://www.uihi.org/wp-content/uploads/2013/08/FINAL-Value-Card-Set-082313-CMS.pdf>

<https://www.amazon.com/Values-Cards-John-Veeken/dp/0980517532/ref=pd_bxgy_img_2/134-1308925-0638118?_encoding=UTF8&pd_rd_i=0980517532&pd_rd_r=20c7b661-ef83-4df9-b4b2-6acaae9b6032&pd_rd_w=1P9bQ&pd_rd_wg=R8ERy&pf_rd_p=ce6c479b-ef53-49a6-845b-bbbf35c28dd3&pf_rd_r=WV6VP70VCYMXV12SZY01&psc=1&refRID=WV6VP70VCYMXV12SZY01>

<https://www.amazon.com/Leadership-Challenge-Workshop-Values-Cards/dp/0470559705/ref=pd_sim_14_4/134-1308925-0638118?_encoding=UTF8&pd_rd_i=0470559705&pd_rd_r=017156c9-e1e7-4f5c-bc17-c373a9b46e74&pd_rd_w=gsWgF&pd_rd_wg=3c61f&pf_rd_p=672258bc-00f4-47f4-af1f-47dd66456e39&pf_rd_r=VT96AQ2PG139Q9RTVSYM&psc=1&refRID=VT96AQ2PG139Q9RTVSYM>






