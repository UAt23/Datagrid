**Task**
- Single page app with a table in the center focus. It has navbar with companies home webpage links. Application is basically table management. Table has search, filter, add, and pagination functionalities.
  
**Steps**

1. There are two libraries given to use. I have choose the DevExtreme DataGrid since I will develop the application in Angular.

2. Provided design is for desktop sizes. So, I will first create the app for desktop sizes and than make it responsive for other screen sizes.

3. Since there is no BE API I will keep the mock data inside of a constant file and provide it to the table and store it with changes in to the local storage.

4. I have created the Angular app 
   ```bash
   ng new datagrid --standalone false
   ```

5. After I created the application I checked the DevExtreme DataGrid documentation. It is quite messy to navigate and find necessary information for table functions and stylization. So I decided to create the navbar component first.

6. I took the company logo and created the links for company site routings and company media. I used flex-box to create the necessary layout.

7. Then I imported DevExtreme DataGrid using following the documentation. 

8. I tried to change the table style following the documentation but it was not going well so I find the necessary CSS classes using the Chrome Devtools and changed the styles inside the styles.css file inside my project.

9. After Table style is quite similar to the design provided I started to code the upper functions UI of the table which are search box, filter button and add button. I first tried to find the functionalities in the DevExtreme documentation but it was no use so I decided to do it myself.

10. After that I created the UI for the upper side of the table, I started the create pagination UI of the table. Up to this point I had problem with the icons provided inside the DevExtreme library and decided to import the FontAwesome icon library following the documentation. Bot current page size setting up and down buttons was not really clickable so I downloaded the .svg files from the Figma design and used it there.

11. After the UI for the pagination done I created a table service to provide data to the table. Then I checked how the pagination works from the library and connected my variables to the table.

12. I created the search-box serach function by filtering the table. Then I started to create the interactions for the pagination part.

13. Once they are done I started to implement the UI for the modal but first I needed a shared module which I created to implement a modal service and component to show and hide the UI and update the data of the table rows. I used Angular CDK Overlay to provide the floating display and disappear onclick out functionalities.  

14. Once I created that I created the modal UI and implemented the form logic so that when each field of filled user can add the values inputted to the table. (It take a bit time to validate the form but I managed to done it )

15. At that point I thought there are no clue if user successfully added the new row so I created a service and component inside mey shared modal for a notification.

16. When its finished I created the logic when a new row added how the pagination variables will be updated accordingly.

17. After I was sure functionality is working fine I decided to divide the data-grid component. So, I created the 2 components for upper functionalities and the pagination. After that I updated the logic a bit so that modal work properly.

18. When dividing the data-grid is finished I started to make the app responsive. I used media queries to manage that.

19. To make the navbar responsive, I created a now shared component. This component will be a sidebar menu which will be activated on tablet and mobile screens using the hamburger button that replaces the navigation and media butotns on the navbar. 

20. Once its finished I updated the README file and followed the steps to run the application on another laptop. After upgrading the npm and angular/cli versions the application was running nicely on localhost/4200.

**I hope you like what you see and how I coded the project. I look forward to meeting you soon**   