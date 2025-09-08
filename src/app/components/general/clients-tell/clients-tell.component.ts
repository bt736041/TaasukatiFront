import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-tell',
  imports: [],
  templateUrl: './clients-tell.component.html',
  styleUrl: './clients-tell.component.scss'
})
export class ClientsTellComponent {
  clients = [{ name: "נעמה כהן", sentence: "יצאתי מכאן ברורה עם מטרה מול העיניים, אין על זה!", rating: "⭐⭐⭐⭐⭐" },
  { name: "חני לביא", sentence: "שוה! שוה! שוה! היום יאני עובדת בעבודה שמתאימה לי ונהנית עד הגג!!!", rating: "⭐⭐⭐⭐⭐" }, 
  { name: "הדס שרון", sentence: "ממליצה בחום לכל אחד שמחפש עבודה נורמלית", rating: "⭐⭐⭐⭐⭐" }, 
  { name: "דבורה מאירי", sentence: "חני היא אשה אלופה! עושה לך סדר בראש!", rating: "⭐⭐⭐⭐⭐" }
  ]

}
