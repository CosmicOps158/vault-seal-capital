import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { environment } from '../config/environment';

export const config = getDefaultConfig({
  appName: environment.APP_NAME,
  projectId: environment.WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
