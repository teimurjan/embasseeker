# Embasseeker

## Usage

### Commands

- `/start` - to start using the bot.
- `/barcode` - to set your barcode & track the available slots.
- `/reset_barcode` - to clear the barcode from the bot's DB.

## Development

1. Install Node (version is specified in  [.nvmrc](./.nvmrc)).
2. Run `npm i` to install dependencies.
3. Set up database:
   1. Install Docker & Docker Compose.
   2. Run `docker-compose up -d`
4. Run `env DATABASE_URL=postgres://test:test@localhost:5432/test npm run migrate up` to migrate your database installed at the previous step.
5. Make a `.env` file based on [the example](./.env.example).
6. Run `npm run bot`.