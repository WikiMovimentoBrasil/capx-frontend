# <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Capx-logo-redux.svg" alt="logo of the Capacity Exchange" width="50" title="Capacity Exchange" style="transform:translateY(5px)"> The Capacity Exchange

The Capacity Exchange (CapX) is a project focusing on [Global Approaches to Local Skills Development](https://meta.wikimedia.org/wiki/Movement_Strategy/Initiatives/Global_Approach_for_Local_Skill_Development) within and for the Wikimedia Movement. It establishes a sociotechnical platform for peer-to-peer connection and knowledge sharing to sustainably enable community-based capacity-building.

The aim is to create a methodology and service, which will serve as the structure for initiating mutual skills development globally, regionally, and locally. An interactive, online platform, backed by a database, will enable wikimedians to publish information about themselves, their affiliates, and informal groups. They will also be able to conduct searches, access information and to connect with each other in a way that reflects the Wiki's spirit and the Wikimedia Movement Strategy.

The Capacity Exchange (CapX) is available in Toolforge at https://capx.toolforge.org

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- NodeJS >=18

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/WikiMovimentoBrasil/capx-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd capx-frontend
   ```

3. Install project dependencies:

   ```bash
   yarn install
   ```

4. Rename the `.env.example` file to `.env` and comment the following lines in order to use the development server:

   ```bash
   LOGIN_STEP01_URL="https://capx-backend.toolforge.org/api/login/social/knox/mediawiki/"
   LOGIN_STEP02_URL="https://meta.wikimedia.org/wiki/Special:OAuth/authorize"
   LOGIN_STEP03_URL="https://capx-backend.toolforge.org/api/login/social/knox_user/mediawiki/"
   BASE_URL="https://capx-backend.toolforge.org"
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

You should now be able to access the project at http://localhost:3000/ in your web browser.

## Contributing

Contributions are welcome! To contribute to the Capacity Exchange, follow these steps:

1. Fork the repository
2. Create a new branch: git checkout -b feature/your-feature
3. Make your changes and commit them: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature/your-feature
5. Create a pull request on GitHub against the 'dev' branch

## License

This project is licensed under the GNU AGPLv3 - see the LICENSE file for details.
