Dependencies
The component depends on the following libraries:

react: a JavaScript library for building user interfaces.
react-chartjs-2: a React wrapper for Chart.js, a popular charting library.
file-saver: a library for saving files in the browser.
lottie-react: a library for rendering animations created with Adobe After Effects and exported as JSON files using the Bodymovin plugin.
framer-motion: a library for creating animations and page transitions in React applications.
react-mouse-particles: a library for creating interactive mouse particles effects in React applications.
How it Works
The component fetches a text file from the remote server using the fetch function and counts the frequency of each word using the split and reduce methods of the String and Array prototypes. The resulting word frequencies are stored in a state variable using the useState hook.

The component uses the Bar component from the react-chartjs-2 library to display the word frequencies in a bar graph. The data object specifies the labels and values for the bar graph, and the options object configures the appearance and behavior of the chart.

The component also provides an option to export the top 20 word frequencies as a CSV file using the handleExport function and the file-saver library. When the "Export" button is clicked, the function generates a CSV file with the word frequencies and prompts the user to download it.

The JSON animation created using Lottie React is displayed using the Lottie component from the library. The animation file is imported into the component as a JSON object and passed as a prop to the Lottie component.

The animations and page transitions created using Framer Motion are implemented using various components and hooks from the library. For example, the motion.div component is used to create animated div elements, and the useAnimation and useCycle hooks are used to create animated sequences and loops.

The mouse particles effect created using react-mouse-particles is implemented using the MouseParticles component from the library. The component is added as a child element to the BarGraph component and configured with various options such as particle size, color, and movement speed.

License