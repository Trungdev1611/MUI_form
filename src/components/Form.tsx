import {
  Box,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Avatar,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material"
import { purple } from "@mui/material/colors"
import React, { useState } from "react"
import LockIcon from "@mui/icons-material/Lock"
interface IformData {
  email: string
  password: string
  address: string | undefined
  isRemember: 1 | 0
}
// eslint:disable-next-line
type IError = Omit<IformData, `isRemember`>
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
const Form = () => {
  const [formData, setFormData] = useState<IformData>({
    email: "",
    password: "",
    address: "",
    isRemember: 1,
  })
  const [errors, setErrors] = useState<IError>({
    email: "",
    password: "",
    address: "",
  })
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(`formData`, formData)
    const errObj: IError = { ...errors }

    Object.keys(errors).forEach((key) => {
      if (formData[key as keyof IError] === "") {
        errObj[key as keyof IError] = `Vui lòng nhập thông tin vào trường ${key}`
      }

      if (!EMAIL_PATTERN.test(formData.email)) {
        errObj.email = `Email là không hợp lệ`
      }

      if (formData[key as keyof IError] === "") {
        errObj[key as keyof IError] = `Vui lòng nhập thông tin vào trường ${key}`
      } else {
        errObj[key as keyof IError] = ``
      }
    })
    setErrors(errObj)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target)
    if (e.target.name === "isRemember") {
      setFormData({
        ...formData,
        isRemember: e.target.checked ? 1 : 0,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  function handleChangeSelect(event: SelectChangeEvent) {
    setFormData({
      ...formData,
      address: event.target.value,
    })
  }
  console.log("err", errors)
  return (
    <Stack alignItems={"center"} justifyContent={"center"} sx={{ marginTop: "100px" }}>
      <Stack
        sx={{ width: "400px" }}
        gap={"20px"}
        direction={"column"}
        justifyContent={"center"}
        onSubmit={handleSubmit}
        component={"form"}
      >
        <Stack alignItems={"center"}>
          <Avatar sx={{ bgcolor: purple[500] }}>
            <LockIcon />
          </Avatar>
        </Stack>
        <Typography variant="h5" component="h2" align="center" sx={{ color: `#333`, marginBottom: "10px" }}>
          Sign in
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          variant="outlined"
          onChange={handleChange}
          helperText={errors.email} //nên sử dụng với <FormHelperText> trong MUI, ở đây ta đang sử dụng luôn với helperText property
          error={!!errors.email}
          value={formData.email}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          variant="outlined"
          onChange={handleChange}
          helperText={errors.password}
          error={!!errors.password}
          value={formData.password}
        />
        <FormControl fullWidth>
          <InputLabel
            id="address"
            //dấu !! chuyển 1 giá trị truethy hoặc falsy sang boolean
            error={!!errors.address}
          >
            Address
          </InputLabel>
          <Select labelId="address" id="address" value={formData.address} label="Age" onChange={handleChangeSelect}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={`10`}>Ten</MenuItem>
            <MenuItem value={`20`}>Twenty</MenuItem>
            <MenuItem value={`30`}>Thirty</MenuItem>
          </Select>
          <FormHelperText error>{errors.address}</FormHelperText>
        </FormControl>

        <FormControlLabel
          control={<Checkbox defaultChecked name="isRemember" onChange={handleChange} />}
          label="Remember me"
        />
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </Stack>
    </Stack>
  )
}

export default Form
