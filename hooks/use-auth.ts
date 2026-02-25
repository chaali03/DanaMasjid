import { useMutation, useQuery } from '@tanstack/react-query'

const API_URL = 'http://localhost:3001/api/auth'

// Types
interface RegisterStep1Data {
  name: string
  email: string
  phone: string
}

interface VerifyOTPData {
  email: string
  otp: string
}

interface CompleteRegistrationData {
  name: string
  email: string
  phone: string
  password: string
  mosqueName: string
  mosqueAddress: string
  mosqueCity: string
}

interface LoginData {
  emailOrPhone: string
  password: string
}

interface ForgotPasswordData {
  email: string
}

interface ResetPasswordData {
  email: string
  otp: string
  password: string
}

// API Functions
const registerStep1 = async (data: RegisterStep1Data) => {
  const response = await fetch(`${API_URL}/register/step1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to send OTP')
  return response.json()
}

const verifyOTP = async (data: VerifyOTPData) => {
  const response = await fetch(`${API_URL}/register/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Invalid OTP')
  return response.json()
}

const completeRegistration = async (data: CompleteRegistrationData) => {
  const response = await fetch(`${API_URL}/register/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Registration failed')
  return response.json()
}

const login = async (data: LoginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
}

const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to send reset OTP')
  return response.json()
}

const verifyResetOTP = async (data: VerifyOTPData) => {
  const response = await fetch(`${API_URL}/verify-reset-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Invalid OTP')
  return response.json()
}

const resetPassword = async (data: ResetPasswordData) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Password reset failed')
  return response.json()
}

// Custom Hooks
export const useRegisterStep1 = () => {
  return useMutation({
    mutationFn: registerStep1,
  })
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
  })
}

export const useCompleteRegistration = () => {
  return useMutation({
    mutationFn: completeRegistration,
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  })
}

export const useVerifyResetOTP = () => {
  return useMutation({
    mutationFn: verifyResetOTP,
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  })
}
