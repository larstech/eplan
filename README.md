# Electronic Planning Board

![Yourtech logo made in Calc](public/yourtech-logo-in-calc.png)
<i>Credits to Vecteezy for the font design.</i>

Electronic Planning Board for Yourtech, a simple alternative to Excel.

## Requirements

* Node version 22 or above
* pnpm

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

# Open the .env file and change '[YOUR-PASSWORD]' to your local Postgres instance its password. Default: postgres
```

4. Running the local environment

```bash
pnpm run dev
```

For further assistance, please consult the related documentation.

## License

This project is licensed under the [MIT License](LICENSE).
