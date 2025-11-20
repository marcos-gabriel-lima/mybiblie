import { NextResponse } from 'next/server'

/**
 * Arquivo necessário para TWA (Trusted Web Activity)
 * Permite que o app Android seja vinculado ao domínio
 * 
 * IMPORTANTE: Substitua o SHA256 pelo fingerprint da sua keystore
 * Obtenha com: keytool -list -v -keystore ./keystore.jks -alias bibliaalmeida
 */
export async function GET() {
  const assetlinks = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.bibliaalmeida.app", // Altere para seu package name
        sha256_cert_fingerprints: [
          // COLE O SEU SHA256 FINGERPRINT AQUI
          // Exemplo: "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
        ]
      }
    }
  ]

  return NextResponse.json(assetlinks, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

