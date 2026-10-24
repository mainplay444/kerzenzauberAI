# Kroizauber Support

Separate deutsche Support-Website mit Java 21, Spring Boot und OpenAI Responses API.

## Voraussetzungen
- JDK 21
- Maven oder Maven Wrapper
- OpenAI-API-Schlüssel mit aktivierter API-Abrechnung

## Start unter Windows / PowerShell
1. ZIP entpacken und den Ordner in IntelliJ IDEA öffnen.
2. In PowerShell im Projektordner den Schlüssel für dieses Terminal setzen:

   ```powershell
   $env:OPENAI_API_KEY="DEIN_API_SCHLUESSEL"
   $env:OPENAI_MODEL="gpt-6-astra"
   ```

   Nutze ein Modell, das in deinem API-Konto tatsächlich verfügbar ist; Modellnamen und Preise können sich ändern.

3. Starte `SupportApplication.java` in IntelliJ IDEA. Alternativ mit installiertem Maven:

   ```powershell
   mvn spring-boot:run
   ```

4. Öffne `http://localhost:8080`.

## Test der API
```powershell
Invoke-RestMethod -Uri http://localhost:8080/api/chat -Method Post -ContentType "application/json" -Body '{"message":"Wie pflege ich eine Bienenwachskerze?","history":[]}'
```

## Wichtig
- API-Schlüssel niemals in HTML, JavaScript oder ein öffentliches GitHub-Repository eintragen.
- Vor Veröffentlichung Rate-Limits, Missbrauchsschutz, Kostenlimits und Datenschutzhinweise ergänzen.
- Dieser Prototyp kennt keine echten Bestellungen, Zahlungen, Lagerbestände oder Versanddaten.
- Der Chatverlauf bleibt nur im Browser-Speicher dieser Seite und wird nicht absichtlich vom Server gespeichert.
- Der Java-Server muss auf einem Host laufen, der Java-Anwendungen unterstützt. GitHub Pages allein kann keinen Java-Server ausführen.
