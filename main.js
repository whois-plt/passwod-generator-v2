// declare variables

const pswGenOutput = document.getElementById("psw-gen-output")
const pswGenOutputCopyBtn = document.querySelector(".psw-gen-output-copy-btn")
const pswGenLengthNum = document.getElementById("psw-gen-length-num")
const checkboxes = document.querySelectorAll(".psw-checkbox")
const pswGenLength = document.getElementById("psw-gen-length")
const pswGenUppercase = document.getElementById("psw-gen-uppercase")
const pswGenLowercase = document.getElementById("psw-gen-lowercase")
const pswGenNumbers = document.getElementById("psw-gen-numbers")
const pswGenSymbols = document.getElementById("psw-gen-symbols")
const pswGenBtn = document.getElementById("psw-gen-btn")
const pswStrengthBar = document.querySelectorAll(".psw-strength-bar")

// prettier-ignore
const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'];
// prettier-ignore
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];
// prettier-ignore
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
// prettier-ignore
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '~'];

// default values

pswGenUppercase.checked = true
pswGenLowercase.checked = true
pswGenNumbers.checked = true
defaultValues()

// event listeners

pswGenOutputCopyBtn.addEventListener("click", (e) => {
  e.preventDefault()
  pswGenOutput.select()
  document.execCommand("copy")
  pswGenOutputCopyBtn.classList.add("animate__bounce")
  setTimeout(() => {
    pswGenOutputCopyBtn.classList.remove("animate__bounce")
  }, 1000)
})

pswGenBtn.addEventListener("click", () => {
  pswGenOutput.value = generatePassword()
  scrollToPasswordGenerator()
})

pswGenLength.addEventListener("input", () => {
  pswGenLengthNum.value = pswGenLength.value
  pswGenOutput.value = generatePassword()
  updatePasswordStrength()
})

pswGenLengthNum.addEventListener("input", function () {
  pswGenOutput.value = generatePassword()
  pswGenLength.value = pswGenLengthNum.value
  updatePasswordStrength()
  if (pswGenLengthNum.value > 20) {
    defaultValues()
  }
})

document.querySelector(".psw-gen-output-copy-btn").addEventListener("click", function () {
  var tooltip = document.getElementById("tooltip")
  tooltip.classList.add("show")
  setTimeout(function () {
    tooltip.classList.remove("show")
  }, 2500)
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function (e) {
    const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked)
    if (checkedCheckboxes.length === 1) {
      checkedCheckboxes[0].parentNode.style.opacity = "0.6"
      checkedCheckboxes[0].parentNode.style.cursor = "not-allowed"
      checkedCheckboxes[0].disabled = true
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.parentNode.style.opacity = "1"
        checkbox.parentNode.style.cursor = "pointer"
        checkbox.disabled = false
      })
    }
  })
})

// functions

function isMobileDevice() {
  return window.innerWidth <= 768
}

function scrollToPasswordGenerator() {
  if (isMobileDevice()) {
    const targetElement = document.querySelector(".psw-gen-title")
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }
}

function defaultValues() {
  pswGenLength.value = 12
  pswGenLengthNum.value = 12
  pswGenOutput.value = generatePassword()
}

function getRandomCharacter(characters) {
  const characterIndex = Math.floor(Math.random() * characters.length)
  return characters[characterIndex]
}

function generatePassword() {
  let password = ""
  let characterList = []

  if (pswGenUppercase.checked) {
    characterList = characterList.concat(uppercaseLetters)
    password += getRandomCharacter(uppercaseLetters)
  }
  if (pswGenLowercase.checked) {
    characterList = characterList.concat(lowercaseLetters)
    password += getRandomCharacter(lowercaseLetters)
  }
  if (pswGenNumbers.checked) {
    characterList = characterList.concat(numbers)
    password += getRandomCharacter(numbers)
  }
  if (pswGenSymbols.checked) {
    characterList = characterList.concat(symbols)
    password += getRandomCharacter(symbols)
  }

  for (let i = password.length; i < pswGenLength.value; i++) {
    const characterIndex = Math.floor(Math.random() * characterList.length)
    password += characterList[characterIndex]
  }

  pswGenOutput.value = password // Update pswGenOutput value

  return password
}

pswGenUppercase.addEventListener("change", generatePassword)
pswGenLowercase.addEventListener("change", generatePassword)
pswGenNumbers.addEventListener("change", generatePassword)
pswGenSymbols.addEventListener("change", generatePassword)

function updatePasswordStrength() {
  const length = parseInt(pswGenLength.value)
  pswStrengthBar.forEach((bar, index) => {
    if (length >= 16) {
      bar.style.backgroundColor = "white"
    } else if (length >= 12 && index < 3) {
      bar.style.backgroundColor = "white"
    } else if (length >= 8 && index < 2) {
      bar.style.backgroundColor = "white"
    } else if (length >= 4 && index < 1) {
      bar.style.backgroundColor = "white"
    } else {
      bar.style.backgroundColor = "transparent"
    }
  })
}

pswStrengthBar.forEach((bar, index) => {
  if (index < 2) {
    bar.style.backgroundColor = "white"
  }
})
