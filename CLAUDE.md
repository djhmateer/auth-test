# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple authentication test project that demonstrates basic HTTP authentication using Netlify Edge Functions. The project consists of:

- A minimal static site with an index page and protected projects directory
- A Netlify Edge Function that implements HTTP Basic Authentication
- Netlify configuration to protect specific routes

## Architecture

The project uses Netlify's edge function system to implement authentication:

1. **Static Content**: The root `index.html` serves as the main landing page with a link to the protected projects area
2. **Protected Area**: The `/projects/` directory contains content that requires authentication
3. **Authentication Layer**: The `netlify/functions/basic-auth.ts` edge function intercepts requests to `/projects/*` and validates HTTP Basic Auth credentials
4. **Configuration**: `netlify.toml` configures the edge function to run on the `/projects/*` path

## Key Files

- `index.html` - Main landing page
- `projects/index.html` - Protected content
- `netlify/functions/basic-auth.ts` - HTTP Basic Auth implementation using Deno
- `netlify.toml` - Netlify configuration for edge function routing

## Authentication System

The basic-auth edge function:
- Expects HTTP Basic Authentication headers
- Validates against environment variables `BASIC_USER` and `BASIC_PASS` (defaults to "user"/"pass")
- Returns 401 with WWW-Authenticate header if authentication fails
- Forwards the request if authentication succeeds

## Development

This is a static site with serverless functions. No build process, package management, or local development server is configured. The project is designed to be deployed directly to Netlify.

To test authentication locally, you would need to:
1. Set up Netlify CLI with edge function support
2. Configure the `BASIC_USER` and `BASIC_PASS` environment variables
3. Use `netlify dev` to run the edge functions locally