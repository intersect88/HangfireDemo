# Articolo-2
Articolo su Hangfire

Recentemente mi è stata assegnata una user story in cui si richiedeva di capire come integrare hangfire nel progetto esistente e quindi come creare dei jobs.
Non conoscendo 
Hangfire è un worker in background etc etc

Hangfire consente di creare diversi tipi di jobs. ad esempio ... etc etc 

Hangfire richiede per il suo funzionamento la presenza di un database, 


Per fare un esempio di come integrare hangfire il un progetto consideriamo il seguente esempio, dove abbiamo un'applicazione realizzata in .net core e con frontend angular dove supponiamo che alla pressione di un tasto debba essere  eseguita una determinata azione tradotta quindi in un job.
Per questioni di praticità utilizziamo sqlserver con l'istanza locale. Hangfire permette comunque di utilizzare diversi tipi di storage quali .....

andiamo quindi ad integrare hangfire nel progetto corrente e successivamente andiamo a definre il job che sarà lanciato in seguito alla pressione del tasto.


##Swagger

Di recente ho lavorato al backend di un'applicazione per un nostro cliente. Alcuni  *tasks* erano relativi all'introduzione di nuove API da annotare con **Swagger** ed, in particolare, uno di questi richiedeva di abilitare **Swagger** solo per l'*environment* di *debug* e disabilitarlo per quello di *produzione*.
###Ma cos’è **Swagger**?
**Swagger**, è un set di tool che fanno da contorno alla specifica **[OpenApi](https://github.com/OAI/OpenAPI-Specification)** (**OAS**), ovvero lo standard per la descrizione delle API Rest, per creare e documentare tali API.
Lo standard **OAS** è indipendente dal linguaggio di programmazione ed è stato pensato per essere compreso sia dalle persone che dai computer allo scopo di rendere più semplice capire ciò che viene messo a disposizione da un servizio senza dover accedere al codice sorgente o ad ulteriore documentazione.
In un progetto **._NET_** è possibile integrare **Swagger** installando, tramite il gestore di pacchetti **Nuget**, il pacchetto Open Source **Swashbuckle**.
Una volta installato, troveremo nella cartella _App_start_ il file _SwaggerConfig.cs_.
![1](/image1.png)
Tale file contiene diversi commenti utili alla configurazione di **Swagger** per la nostra applicazione.
In particolare possiamo indicare un file _XML_ dove verranno salvati i commenti con cui possiamo annotare le nostre API.

```csharp{.line-numbers}
c.IncludeXmlComments(GetXmlCommentsPath());
```
Per evitare errori bisogna a questo punto andare nelle proprietà del progetto e nella scheda *Build*, sezione *Output*, flaggare l'opzione "XML documentation file", indicando il file *XML* di destinazione.
![2](/image2.png)
Terminata questa configurazione è possibile annotare le API con i seguenti _tags_ :

- Summary
```xml{.line-numbers}
/// <summary>
/// Esempio Commenti Swagger
/// </summary>
```
- Remarks
```xml{.line-numbers}
/// <remarks>Osservazioni </remarks>
```
- Parameter
```xml{.line-numbers}
/// <param name="id" cref="int">Value id</param>
/// <param name="value" cref="string">Value string</param>
```
- Response
```xml{.line-numbers}
///<response code="500">Ops!!! Error 500 </response>
```

Consideriamo la seguente _action_ che effettua una *GET*.

```cs{.line-numbers}
/// <summary>
/// Esempio Commenti Swagger
/// </summary>
/// <param name="id" cref="int">Value id</param>
/// <param name="value" cref="string">Value string</param>
/// <remarks>Osservazioni </remarks>
///<response code="500">Ops!!! Error 500 </response>
public string Get(int id, string value)
{
    return value+id.ToString();
}
```
Il risultato delle annotazioni possiamo vederlo nella **[SwaggerUI](https://swagger.io/tools/swagger-ui/)** raggiungibile all'indirizzo:`[host]:[port]/swagger`.
![3](/image3.png)

Come possiamo configurare **Swagger** rendendolo disponibile solo per l'*environment* di sviluppo e disabilitarlo invece per quello di produzione?
Ci sono dei semplici passaggi da fare che andremo ad illustrare. 
Innanzitutto definiamo, nel file _web.config_, una nuova _key_ all'interno del _tag_ <_appsettings_>.

```xml{.line-numbers}
<appSettings>
    <add key="DisableSwagger" value="False" />
</appSettings>
```
Successivamente, all’interno del file _SwaggerConfig.cs_ ed in particolare all’interno del metodo _Register()_, aggiungiamo una controllo sul valore della _key_ definita precendentemente.
```csharp{.line-numbers}
if (ConfigurationManager.AppSettings["DisableSwagger"] == "True")
{
    return;
}
```
Creiamo, quindi, una regola di trasformazione all’interno del _Web.Release.config_ per la quale verrà settato il parametro _DisableSwagger_ al valore **_true_** in modo che la condizione non sia verificata per l'*environment* di produzione.
```xml{.line-numbers}
<add key="DisableSwagger" value="True" xdt:Transform="Replace" xdt:Locator="Match(key)" />
```
Possiamo vedere l’effetto di questa trasformazione cliccando col tasto destro su _Web.Release.config_ e selezionando _“Preview Transform”_
![4](/image4.png)
ottenendo quindi l'effetto desiderato come mostrato di seguito
![4](/image5.png)
