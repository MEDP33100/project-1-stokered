[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2JhgCWku)
# MEDP 33100 Project 1: Interactive Storytelling

## Project Overview

- I wanted to create a horror narrative story where users have two choices to figure out how to get out of the catacombs.

## Figma Design

- [Provide a link to the Figma design of the webpage.](https://www.figma.com/board/yOd6eRJc8Ho1qsLdxQwHkm/WEBP-Project-1?node-id=0-1&p=f&t=8ZsxOeb7FRMcynNC-0)
- Because this is a multiple choice narrative, my best design opportunity was to plan out all the different splits in choices and where they would lead. I wrote notes in the Figma sections of how I wanted specific parts to look.

## Features

- List the key features of the project, including:
    - **Animations**: CSS animations, GSAP effects
    - **Sound Effects**: sound effects are used when triggered by certain data-events to add to the realistic feeling of the game
    - **User-triggered Events**: clicking through the buttons
    - **Responsive Design**: using @media in CSS

## Technologies Used

- List the technologies and tools used in the project:
    - **Languages**: HTML, CSS, JavaScript
    - **Libraries**: GSAP
    - **Other**: Github Pages for hosting, Figma for design

## Live Demo

- [Include a link to the live version of the project hosted on GitHub Pages.](https://medp33100.github.io/project-1-stokered/)

## Credits

- Google Fonts: https://fonts.googleapis.com/css2?family=Caudex:ital,wght@0,400;0,700;1,400;1,700&display=swap" 
- Youtube: https://www.youtube.com/watch?v=mW9aVjOAUE0
- ChatGPT Sora for the video 
- ChatGPT for debugging and help with AJAX implementation

## Future Enhancements

- The original goal of my narrative was to have users find a piece of paper that has four marked points on it that could kind of resemble colored squares on a 4x4 grid. They would then find a series of stones in the shape of a 4x4 grid and using the note, would have to press the right sequence in order to escape the catacombs. If they pressed the wrong sequence, the rocks would crumble on them and they would…well…die! 

I thought I could do this through creating a 4x4 column through HTML and CSS, then inputting the correct sequence using eventListeners on JS by giving them the correct sequence in a numerically assigned value to each square (i.e. row 1 column 1 would be 1.1, and so on until 4.4). I wanted to restrict it so that only one square could be pressed on each row, so the probability of getting the sequence right would quarter after each completion. If you found the note, it didn’t really matter, but there is a path within my narrative where you can get to this final stage without finding the note, so it would make it hard to guess. I got the CSS grid working, but could not figure out the onClick functionality for some reason, and eventually had to scrap it. 

