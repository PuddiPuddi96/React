# Description
Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga?

# Set-up environment
## Frontend section
After creating the [frontend]() folder, follow the steps below:
1. Create react project with the comand
    ```console 
    npm create vite@latest . 
    ```
    As a *framework* select **React** and as a *variant* select **Typescript**.
2. Execute the comand 
    ```console
    npm install
    ```
3. To check that everything has been done correctly, run the command
    ```console
    npm run dev
    ```

## Root section
1. In the main project folder, execute the following commands:
    ```console
    npm init -y
    npm install typescript ts-node nodemon -D
    npx tsc --init
    ``` 
2. In the [tsconfig.json]() file, copy the following json: 
    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "outDir": "./backend/dist",
        "rootDir": "./backend",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true
      },
      "ts-node": {
        "esm": true
      },
      "include": ["backend/src/**/*"],
      "exclude": ["node_modules", "**/*.spec.ts", "frontend"]
    }
    ```
3. In the [package.json]() file: 
    - add "type": "module"
    - update 
      ```json
      "scripts": {
        "dev": "nodemon --watch backend/src --exec ts-node backend/src/index.ts"
      }
      ```