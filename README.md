# Electronic Planning Board

![Yourtech logo](public/yourtech-logo-full.png)
<i>Credits to Vecteezy for the font design.</i>

Electronic Planning Board for Yourtech, a simple alternative to Excel.

## Requirements

- Node version 22 or above
- pnpm
- Docker

## Getting Started

<i>These steps are validated on a Linux machine. If you run on a different OS and some commands do not work, please consult the documentation. Also, consider switching to Linux.</i>

1. Clone the repository

```bash
git clone git@github.com:larstech/eplan.git

# Go to the repository after cloning to run the other commands.
cd eplan
```

2. Install dependencies

```bash
pnpm install
```

3. Setup local environment

```bash
cp .env.example .env
```

Open the `.env` file and change _[YOUR-PASSWORD]_ to your local Postgres instance its password. Default: postgres

4. Running the local environment

```bash
pnpm supabase start
pnpm run dev
pnpm prisma migrate dev
```

For further assistance, please consult the related documentation.

## License

This project is licensed under the [MIT License](LICENSE).
