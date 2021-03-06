<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@firebase/auth](./auth.md) &gt; [signInWithRedirect](./auth.signinwithredirect.md)

## signInWithRedirect() function

Authenticates a Firebase client using a full-page redirect flow.

<b>Signature:</b>

```typescript
export declare function signInWithRedirect(auth: externs.Auth, provider: externs.AuthProvider, resolver?: externs.PopupRedirectResolver): Promise<never>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  auth | externs.[Auth](./auth-types.auth.md) | The Auth instance. |
|  provider | externs.[AuthProvider](./auth-types.authprovider.md) | The provider to authenticate. The provider has to be an [OAuthProvider](./auth.oauthprovider.md)<!-- -->. Non-OAuth providers like [EmailAuthProvider](./auth.emailauthprovider.md) will throw an error. |
|  resolver | externs.[PopupRedirectResolver](./auth-types.popupredirectresolver.md) | An instance of [PopupRedirectResolver](./auth-types.popupredirectresolver.md)<!-- -->, optional if already supplied to [initializeAuth()](./auth.initializeauth.md) or provided by [getAuth()](./auth.getauth.md)<!-- -->. |

<b>Returns:</b>

Promise&lt;never&gt;

## Remarks

To handle the results and errors for this operation, refer to [getRedirectResult()](./auth.getredirectresult.md)<!-- -->.

## Example


```javascript
// Sign in using a redirect.
const provider = new FacebookAuthProvider();
// You can add additional scopes to the provider:
provider.addScope('user_birthday');
// Start a sign in process for an unauthenticated user.
await signInWithRedirect(auth, provider);
// This will trigger a full page redirect away from your app

// After returning from the redirect when your app initializes you can obtain the result
const result = await getRedirectResult(auth);
if (result) {
  // This is the signed-in user
  const user = result.user;
  // This gives you a Facebook Access Token.
  const credential = provider.credentialFromResult(auth, result);
  const token = credential.accessToken;
}
// As this API can be used for sign-in, linking and reauthentication,
// check the operationType to determine what triggered this redirect
// operation.
const operationType = result.operationType;

```

