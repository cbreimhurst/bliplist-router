<template>
  <header>
      <h2><span class="logo__cursor"></span><a href="/">bliplist</a></h2>
<button @click="logout">log out</button>      
<div class="mode-toggle">
        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z" stroke="currentColor" stroke-linecap="square"></path></svg>
        <button type="button" class="btn btn-toggle" data-toggle="button" aria-pressed="false" autocomplete="off" v-on:click="toggleMode()">
            <div class="handle"></div>
        </button>
        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z" stroke="currentColor" stroke-linejoin="round"></path></svg>
      </div>
  </header>
</template>

<script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  name: 'Header',
  props: ['mode'],
  methods: {
        toggleMode: function(){
            this.$emit('toggle')
		},
		async logout() {  
            let { error } = await supabase.auth.signOut()
            this.error = error
        }
    }
}
</script>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
    max-width: 500px;
}


header div {
  display: flex;
  align-items: center;
  justify-content: end;
}

.mode-toggle,
.mode-toggle * {
	cursor: pointer;
}

.btn {
	display: inline-block;
	font-weight: 400;
	line-height: 1.25;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border: 1px solid transparent;
	padding: .5rem 1rem;
	font-size: 1rem;
	border-radius: .25rem;
	-webkit-transition: all .2s ease-in-out;
	-o-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out;
}

.btn-toggle {
	/* margin: 0 4rem; */
    margin: 0 10px;
	padding: 0;
	position: relative;
	border: none;
	height: 1.5rem;
	width: 3rem;
	border-radius: 1.5rem;
	color: #6b7381;
	background: #bdc1c8;
}

.dark .btn-toggle {
	background-color: #c1c04a;
}

[type="reset"], [type="submit"], button, html [type="button"] {
	-webkit-appearance: button;
}


.btn-toggle::before {
	/* content: 'light'; */
	left: -4rem;
}

.btn-toggle::before, .btn-toggle::after {
	line-height: 1.5rem;
	width: 4rem;
	text-align: center;
	font-weight: 600;
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 2px;
	position: absolute;
	bottom: 0;
	transition: opacity 0.25s;
}

.btn-toggle::after {
	/* content: 'dark'; */
	right: -4rem;
	opacity: 0.5;
}

.dark .btn-toggle::after {
	opacity: 1;
}

.btn-toggle::before, .btn-toggle::after {
	color: #6b7381;
}

[type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner, button::-moz-focus-inner {
	border-style: none;
	padding: 0;
}

.btn-toggle > .handle {
	position: absolute;
	top: 0.1875rem;
	left: 0.1875rem;
	width: 1.125rem;
	height: 1.125rem;
	border-radius: 1.125rem;
	background: #fff;
	transition: left 0.25s;
}

.dark .btn-toggle > .handle {
	left: 1.6875rem;
	transition: left 0.25s, background .25s;
    background:#192734;
}


h2 {
	font-weight: 900;
}


h2 a {
	color: #fff;
	text-decoration: none;
}


.logo__cursor {
 display:inline-block;
 width:10px;
 height: 10px;
 background:#fe5186;
 margin-right:5px;
 border-radius:1px;
 -webkit-animation:cursor 2s infinite;
 animation:cursor 2s infinite
}
@-webkit-keyframes cursor {
 0% {
  opacity:0;
  transform: translate(0px,2px);
 }
 50% {
  opacity:1;
  transform: translate(0px,-8px);
 }
 to {
  opacity:0;
  transform: translate(0px,2px);
 }
}
@keyframes cursor {
 0% {
  opacity:0.2;
  transform: translate(0px,2px) rotate(0deg);
 }
 50% {
  opacity:1;
  transform: translate(0px,-8px) rotate(180deg);
 }
 to {
  opacity:0.2;
  transform: translate(0px,2px)  rotate(360deg);
 }
}
</style>
