import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Word } from 'src/app/models/word';

@Injectable({
  providedIn: 'root'
})
export class IbookService {

  private wordSearchStatus = new BehaviorSubject<boolean>(false);
  public _getWordSearchStatus = this.wordSearchStatus.asObservable()

  private wordLookUP = new BehaviorSubject<Word>(this.defaultWordLookUp);
  public _getWordLookUP = this.wordLookUP.asObservable();

  get defaultWordLookUp(): Word {
    return {
      word: '',  
      definition: '',
      partOfSpeech: '',
      synonyms: [],
      pronunciation: '',
      examples: [],
      antonyms: [],
      syllables: []
    }
  }

  constructor(private http: HttpClient) { }

  setWordSearchStatus(data: boolean) {
    this.wordSearchStatus.next(data);
  }

  fetchWordInfo(word: string) {
    return forkJoin({
      definitions: this.fetchWordDefinitions(word),
      synonyms: this.fetchWordSynonyms(word),
      antonyms: this.fetchWordAntonyms(word),
      syllables: this.fetchWordSyllables(word),
      examples: this.fetchWordExamples(word),
      pronunciation: this.fetchWordPronunciation(word),
    })
    .pipe(
      map((response: any) => {
        return {
          word: word,  
          definition: response.definitions.definitions[0].definition,
          synonyms: response.synonyms.synonyms,
          partOfSpeech: response.definitions.definitions[0].partOfSpeech,
          pronunciation: response.pronunciation.pronunciation.all,
          examples: response.examples.examples,
          antonyms: response.antonyms.antonyms,
          syllables: response.syllables.syllables.list,
        }
      }),
      tap((response: Word) => {
        this.setWord(response)
      })
    )
  }

  fetchWordDefinitions(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/definitions`)
  }

  fetchWordPronunciation(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/pronunciation`)
  }

  fetchWordSynonyms(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/synonyms`)
  }

  fetchWordAntonyms(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/antonyms`)
  }

  fetchWordSyllables(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/syllables`)
  }

  fetchWordExamples(word: string) {
    return this.http.get(`${environment.wordLookUpBaseUrl}/${word}/examples`)
  }

  setWord(data: Word) {
    this.wordLookUP.next(data)
  }
}
