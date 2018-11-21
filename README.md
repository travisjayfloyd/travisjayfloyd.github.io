# CS5890_FinalProject

#1: Basic Info. 

Chase Lundell
chaselundell@gmail.com
A01280335
https://github.com/travisjayfloyd/CS5890_FinalProject

Travis Floyd
utahnskier@gmail.com
A00379167
https://github.com/travisjayfloyd/CS5890_FinalProject

2: Background and Motivation. Discuss your motivations and reasons for choosing this project, especially any background or research        interests that may have influenced your decision.
   We discussed about 8 different options for this assignment that consisted of things like tourism, tornadoes, plane crashes, and utah    auto accidents. The final idea we landed on was a lego database provided by rebrickable.com. This database had the most pros because    it was already set up as a relational database, it is an intriguing topic for both of us, and has enough data to provide insightful      information about the Lego Enterprise.  

#3: Project Objectives. Provide the primary questions you are trying to answer with your visualization. What would you like to learn and     accomplish? List the benefits.
    Some of the different insights we are going to gain from our visualization include:
    The trend of sets released per year over the history of the database.
    Themes that lasted the longest.
    Sets with the most number of pieces.
    Themes with the most sets.
    Themes with the least sets.
    
4: Data. From where and how are you collecting your data? If appropriate, provide a link to your data sources.
   Our dataset is coming from https://rebrickable.com/downloads/ where they provide a downloadable relational database that contains        every official Lego set, part, color, and theme created. Basically, all we’ll have to do is download the csv files and load them into    a MySQL database (most likely using MySQL Workbench) so we can run queries on the tables. When we have the correct results for each      visualization, we can export them as csv files. These files can be loaded into our project using d3. The site specifically says we      are allowed to use this data for any purpose so there are no problems with copyright or data ownership.

#5: Data Processing. Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data      processing be implemented?
   In terms of data cleanup, we will be importing the csv files provided into a mysql database to then query to obtain the specific data    we need for each visualization. That data can then be exported to csv files using the MySql Workbench application. D3 can use csv        files so that will be the end of the data processing. The main columns we’ll be using are the part name, theme name, set name, set      year, color name, and maybe color RGB value. The SQL queries will have to do a number of joins to get the right data but it should be    pretty straightforward.

#6: Visualization Design. How will you display your data? Provide some general ideas that you have for the visualization design. Develop     three alternative prototype designs for your visualization. Create one final design that incorporates the best of your three             designs. Describe your designs and justify your choices of visual encodings. We recommend you use the Five Design Sheet Methodology 

Images have been labeled and uploaded to drive with following names.
 - Img 1
 - Img 2
 - Img 3 - I could add colors to the list on the left since I found a dataset here http://www.peeron.com/inv/colors that lists all the             colors and how many parts there are per color which might be interesting in a visualization. I could look at things like ‘10             most used colors’,  ‘10 least used colors’, and ‘available colors chart’.
 - Img 4
 - Img 5
 - Img 6 - Final Visualization - This visualization compacts a lot of the previous iterations of visualizations.  The Bubble Chart makes            it more pleasing to the eye and it also makes it easy to understand. Now we are also combining a lot of the previous                    visualizations into a single graph that changes depending on the year selected.  Again this makes it easier for users to                navigate and understand the data being shown.

#7: Must-Have Features. List the features without which you would consider your project to be a failure.
 - Bubble chart containing all years of data
 - Each bubble is hoverable with a pop up that shows themes from that year.
 - Each bubble is selectable and modifies information below.
 - Bar graph below bubble chart that initially shows top 10 themes but once a bubble is selected shows amount of sets in each theme that    year.
 - Line graph next to bar chart showing top 10 most piece sets but changes to top 10 most pieces for the selected year once bubble          selected.
 - Table of sets for the selected year once a bubble is selected. 
 - Each set is hoverable with more information on that specific set.

#8: Optional Features. List the features which you consider to be nice to have, but not critical.
 - The bar chart can be selected to show sets for only that theme in the table.
 - Instead of the name of the set appearing in the table and image of the set will appear.
 - Instead of clicking on the set to bring the popup, they will be hoverable and if clicked more info will be shown including the pieces    needed for that set.

#9: Project Schedule. Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write this in terms of weekly deadlines.

November 12 - Must-Have Features
  -Grab data from SQL - Chase
  -Bar Graph - Chase
  -BubbleChart - Travis
  - Hover menu - Travis
  
November 19 - Must-Have Features
  -Line Graph - Travis
  -LineChart hoverable - Travis
  -Table - Chase
  -Table hoverable - Chase
  
November 26 - Must-Have Features, *Optional Features
  -Adding data into hoverables - both
  *Add images to table - Travis
  *Add pieces for each set - Chase
  
November 30 - Final Submission


use python -m SimpleHTTPServer (port) to run project locally 
