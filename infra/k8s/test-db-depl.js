/* apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: your-app
  template:
    metadata:
      labels:
        app: your-app
    spec:
      containers:
        - name: your-app-container
          image: crawan/test
          ports:
            - containerPort: 3000
      initContainers:
        - name: migration-init-container
          image: node:14 # You can use an image with node and npm installed
          command: ["sh", "-c", "npm install -g node-pg-migrate && node migrate.js"]
          env:
            - name: POSTGRES_USER
              value: postgres
            - name: POSTGRES_PASSWORD
              value: postgres
            - name: POSTGRES_DB
              value: postgres
            - name: DATABASE_URL
              value: postgres://postgres:postgres@postgres:5432/postgres
 */
