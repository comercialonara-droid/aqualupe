/* ============================================================
   AQUALUPE · CONFIGURAÇÃO DO FIREBASE
   Este é o único arquivo que precisa ser editado para ligar o site
   e a Área da Loja ao banco de dados. Passo a passo no LEIA-ME.

   Enquanto AQ_FIREBASE estiver vazio (null), tudo funciona em
   modo demonstração: os dados ficam só no navegador de quem abre.
   ============================================================ */

// Cole aqui o bloco firebaseConfig do projeto (Firebase > Configurações do projeto > Seus apps > Web).
window.AQ_FIREBASE = null;
/* Exemplo:
window.AQ_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "aqualupe-loja.firebaseapp.com",
  projectId: "aqualupe-loja",
  storageBucket: "aqualupe-loja.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};
*/

// E-mails da administração (a dona da marca). No primeiro acesso, quem entrar com um destes
// e-mails vira administradora e pode cadastrar o resto da equipe. Use os mesmos e-mails no firestore.rules.
window.AQ_DONOS = ['EMAIL-DA-FLAVIA@exemplo.com'];
