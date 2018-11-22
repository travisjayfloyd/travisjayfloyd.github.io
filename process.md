Overview and Motivation:
  Over the years, there have been thousands of different Lego sets released.  We wanted to create a way for both Lego enthusiasts and
  collectors to learn more about Lego history and the different sets.  Our project will allow users to view both general information on
  Lego sets such as what sets were released each year, and also more detailed information such as the most popular themed sets for a
  selected year or years.

Related Work:
  The original inspiration for this project came from Chase.  He found the site brickable.com that had massive amounts of data on Legos.  
  We did end up changing our data set to a more manageable data set that didn't contain as much information but still more than enough. 
  We also got some of our motivation from a couple of bubblecharts shown in class.  We really liked how they looked and wanted to mimic
  something similar.  However, with our data set that was not a very efficient way to show our data.  We ended up switching to a time 
  linesimilar to the one used in a homework assignment with some slight modifications.

Questions:
  In this project we wanted to answer the question of how Lego sets have changed over the years.  For example, if we compare the amount 
  of sets released over the past 10 years compared to the 1970s we can see how many more sets are being released.  We can also get a 
  better idea of what kids are interested in by viewing the most popular themes in a year or over a group of years.

Data:
  Initially we were planning on using a data set from brickable that contained multiple databases that could be linked through SQL.
  However, once we got a better idea of the direction we wanted to take this project, we found that this data set would be more than we 
  needed.  We ended up finding a data set that was a single file that would be more inline with our project at 
  https://github.com/seankross/lego/blob/master/data-tidy/legosets.csv  This dataset allowed us to do a direct import into our project 
  by using the csv parser in D3.

Exploratory Data Analysis:
  Initially we were looking at doing a grouped bubblechart for our years, but as we got more into the design we wanted to not only be 
  able to select a single year but multiple years.  With a large grouped bubblechart it would have made this difficult so we changed to 
  a timeline bubblechart.  This makes it much easier for users to compare sets released each year and they can better select a year or 
  years to see more detailed information on.  We also initially were going to use a line graph to show the highest amount of pieces in 
  all lego sets or the selected years but ended up going with a bar chart that is a much better representation of the data.

Design Evolution:
  The largest visualization we considered was a bubblechart.  We did keep it but morphed it into a timeline instead of a true
  bubblechart.  We also considered creating a tree but after looking through our data we found that it wouldn't add much to the
  visualization other than look interesting.  Another graph is a stacked bar graph that we decided we would like to do as an optional
  graph if we have time to implement it.

Implementation:
  Our current implementation allows for a user to select dots on a timeline that represent each year.  The size of each circle represnts
  the amount of sets released each year.  Once a dot is selected the table updates to show only sets released that year.  We also have a 
  bar graph that shows the themes that have the most amount of sets.  This is currently in a rough prototype stage.  Once finished we 
  will have a pop up that when years are hovered over the user will get some basic information about the highlighted dot (year).  Once 
  selected the bar graphs will change to show the amount of themes released only during the selected year.  The over graphs will show   
  the amount of pieces and the top sets in those years.  The table will also update and be cleaned up to better show information on the 
  sets that year.  We will also be implementing a brushing function that will allow users to select multiple years and each graph and 
  the table will all update to reflect the selected years.
