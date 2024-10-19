# Color Mixer App

This is a ReactJS and Next.js-based application where users can drag and drop nodes for color mixing. The app allows users to mix two colors and adjust the weight between them using a mixer utility.

## Features

- **Drag and Drop Nodes**: Users can add input nodes (for colors), a mixer node, and an output node. These can be rearranged and connected together.
- **Color Mixing**: Users can only mix two colors at a time. The weight of each color in the mix can be adjusted using a slider in the mixer utility.
- **Persistence**: All changes made by the user are saved and persisted using Redis.
- **Interactive UI**: Built using the React Flow library for handling the flow and connections of nodes.
- **Styling**: The app's layout and components are styled using Tailwind CSS.

## Installation

To get started with the Color Mixer app, follow these steps:

1. Clone the repository:

    ```bash
    git clone [reactgitflow](https://github.com/HubertTGit/reactflow.git)
    ```

2. Navigate into the project directory and install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

The app will now be running on `http://localhost:3000`.

## Libraries and Tools Used

- **ReactJS**: For building the user interface.
- **Next.js**: As the framework for server-side rendering and routing.
- **React Flow**: For creating and managing the flow of nodes and connections.
- **Tailwind CSS**: For styling the components and layout.
- **Redis**: For persisting user data across sessions.

## License

This project is licensed under the MIT License.

---

Feel free to modify any sections to better suit your project specifics!