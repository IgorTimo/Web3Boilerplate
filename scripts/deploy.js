require("dotenv").config();

//Команды для деплоя
//На локальную сеть сначала надо её запустить командой npx hardhat node, а потом npx hardhat run --network localhost scripts/deploy.js
//Команды для удалённую сеть: npx hardhat run scripts/deploy.js --network rinkeby где rinkeby надо заменить на значение переменной, которая указана в .env

//Для каждого контракта, который хотите задеплоить укажите его название и массив аргументов.
const arrayOfContractsNames = [
  { title: "Greeter", args: ["Hello"] },
  { title: "ManyArgs", args: ["Hi", 777] },
  { title: "MyDate", args: [] },
];

async function main() {
  const arrLength = arrayOfContractsNames.length;

  // Проверяем есть ли что деплоить
  if (arrLength === 0) {
    console.log("Nothing to deploy");
    return;
  }

  console.log(
    `Start deploying of ${arrLength} contract${arrLength > 1 ? "s" : ""}`
  );

  //Получаем подписанта, который и будет оплачивать весь этот праздник деплоя
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  //Выводим его баланс просто для интереса
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Проходимся по каждому из контрактов в нашем массиве arrayOfContractsNames
  for (let i = 0; i < arrayOfContractsNames.length; i++) {
    const title = arrayOfContractsNames[i].title;
    const args = arrayOfContractsNames[i].args;
    // Сообщаем что начинается деплой
    console.log(`Deploying contract #${i + 1} with title ${title}`);
    // Передаём все параметры и деплоим
    const Contract = await ethers.getContractFactory(title);
    const contract = await Contract.deploy(...args);
    await contract.deployed();
    // Дожидаемся коща деплоя и выводим адрес
    console.log(`Deploy finished. ${title} address: ${contract.address}`);
    // Вызываем функцию, которая создаст на фронте нужные файлы
    saveABIForClient(contract, title);
  }
}

function saveABIForClient(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../client/contracts";
  const TokenArtifact = artifacts.readArtifactSync(name);

  // Создаём на фронте директорию под переменные состояния наших контрактов, если её не было
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
    console.log("Crontracts directory created.");
  }
  // Создаём на фронте провайдера под переменные состояния наших контрактов, если его не было. Здесь используестя дефолтный провайдер инфуры, но можете переписать на любой из этих https://docs.ethers.io/v5/api-keys/
  if (!fs.existsSync(`${contractsDir}/provider.js`)) {
    fs.writeFileSync(
      `${contractsDir}/provider.js`,
      `import { ethers } from "ethers";

let provider;
      
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.InfuraProvider("${process.env.NETWORK}");
}

export default provider;
  `
    );
    console.log("Provider created");
  }
  // Создаём на фронте переменную состояния контракта, даже если она была
  fs.writeFileSync(
    `${contractsDir}/${lowercaseFirstLetter(name)}.js`,
    `import {ethers} from 'ethers';
import provider from './provider';    
   
const address = "${contract.address}";

const abi = ${JSON.stringify(TokenArtifact.abi, null, 2)};

const ${lowercaseFirstLetter(
      name
    )} = new ethers.Contract(address, abi, provider);

export default ${lowercaseFirstLetter(name)};

`
  );
  // выводим в логи название этой переменной
  console.log(`Instance ${lowercaseFirstLetter(name)}.js created.`);
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
