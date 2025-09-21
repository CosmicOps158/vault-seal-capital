# Vercel Deployment Guide for Vault Seal Capital

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Instructions

### Step 1: Access Vercel Dashboard

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in with your GitHub account
3. If this is your first time, authorize Vercel to access your GitHub repositories

### Step 2: Create New Project

1. Click the **"New Project"** button on the dashboard
2. You'll see a list of your GitHub repositories
3. Find and select **"vault-seal-capital"** repository
4. Click **"Import"** to proceed

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework Preset**: Select **"Vite"** from the dropdown
- Vercel will automatically detect this is a Vite project

#### Build Settings
- **Root Directory**: Leave as default (`.`)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Click **"Add Environment Variable"** and add the following:

```
NEXT_PUBLIC_CHAIN_ID = 11155111
```

```
NEXT_PUBLIC_RPC_URL = https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
```

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = 2ec9743d0d0cd7fb94dee1a7e6d33475
```

```
NEXT_PUBLIC_INFURA_API_KEY = b18fb7e6ca7045ac83c41157ab93f990
```

### Step 4: Deploy the Project

1. Review all settings to ensure they're correct
2. Click **"Deploy"** button
3. Wait for the build process to complete (usually 2-3 minutes)
4. You'll see the deployment URL once it's finished

### Step 5: Verify Deployment

1. Click on the deployment URL to open your application
2. Test the following features:
   - Wallet connection (RainbowKit)
   - Page loading and navigation
   - Responsive design on mobile/desktop
   - All UI components rendering correctly

### Step 6: Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click on **"Settings"** tab
3. Navigate to **"Domains"** section
4. Add your custom domain if desired
5. Follow DNS configuration instructions

## Post-Deployment Configuration

### Environment Variables Verification

Ensure all environment variables are properly set:
- Check in Vercel Dashboard → Project → Settings → Environment Variables
- Verify all variables are available in both Preview and Production environments

### Build Optimization

The project is configured with:
- **Vite** for fast builds
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **RainbowKit** for wallet integration

### Performance Monitoring

1. Go to Vercel Dashboard → Project → Analytics
2. Monitor:
   - Page load times
   - Core Web Vitals
   - User engagement metrics

## Troubleshooting

### Common Issues

#### Build Failures
- **Issue**: Build fails due to missing dependencies
- **Solution**: Ensure `package-lock.json` is committed and all dependencies are properly listed

#### Environment Variables Not Working
- **Issue**: Environment variables not accessible in the app
- **Solution**: 
  1. Check variable names match exactly (case-sensitive)
  2. Redeploy after adding new variables
  3. Ensure variables are added to both Preview and Production

#### Wallet Connection Issues
- **Issue**: RainbowKit not connecting properly
- **Solution**:
  1. Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
  2. Check network configuration in wallet
  3. Ensure Sepolia testnet is added to wallet

#### Network Configuration
- **Issue**: App not connecting to correct network
- **Solution**:
  1. Verify `NEXT_PUBLIC_CHAIN_ID=11155111` (Sepolia)
  2. Check RPC URL is accessible
  3. Ensure wallet is on Sepolia testnet

### Manual Deployment (Alternative)

If automatic deployment fails, you can deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd vault-seal-capital
vercel

# For production deployment
vercel --prod
```

## Security Considerations

### Environment Variables
- Never commit sensitive keys to the repository
- Use Vercel's environment variable system for secrets
- Rotate API keys regularly

### Network Security
- All wallet interactions use HTTPS
- FHE encryption ensures data privacy
- Smart contract interactions are secure

## Monitoring and Maintenance

### Regular Checks
1. **Weekly**: Check deployment status and performance
2. **Monthly**: Review analytics and user feedback
3. **Quarterly**: Update dependencies and security patches

### Updates
- Push changes to the main branch for automatic deployment
- Use preview deployments for testing new features
- Monitor build logs for any issues

## Support

For deployment issues:
1. Check Vercel documentation: [https://vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel Dashboard
3. Contact support through Vercel's help system

## Success Criteria

Your deployment is successful when:
- ✅ Application loads without errors
- ✅ Wallet connection works properly
- ✅ All pages render correctly
- ✅ Environment variables are accessible
- ✅ Build completes without warnings
- ✅ Performance metrics are within acceptable ranges

## Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Share the deployment URL with stakeholders
3. Set up monitoring and analytics
4. Plan for future updates and maintenance
5. Consider setting up a staging environment for testing

---

**Deployment URL**: Will be provided after successful deployment
**Last Updated**: $(date)
**Version**: 1.0.0
