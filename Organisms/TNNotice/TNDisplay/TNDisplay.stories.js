import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import TNDisplay from './TNDisplay'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

const sampleText = `Lorem ipsum dolor sit amet, ut sed habeo dicit facilis, sed alii urbanitas id, facer noluisse evertitur id mel. Eum recteque democritum omittantur et, adhuc paulo scaevola sit eu, vis ad temporibus reformidans philosophia. Ne duo lorem percipitur. Eius minimum reprehendunt no nam, qui cu moderatius suscipiantur. Cu eam commodo admodum theophrastus. Unum habemus vix ea, id mei democritum cotidieque definitiones, pro diam populo tacimates ne.

Eum id utroque sensibus principes, ius iusto soleat omnesque in, est noluisse principes adipiscing ne. Qui te eruditi deleniti, alii ferri referrentur vel ne. Natum utroque an nam, per in amet molestiae, at voluptua qualisque sadipscing qui. Minim elaboraret mei te. Eam tota aperiam insolens cu, nusquam invidunt mea ex. Sed dicit nonumy feugait ad, qui suscipit philosophia an.

Sea eius postea signiferumque ea. Altera argumentum nam at, putant mollis tibique duo te, at duo quidam rationibus. Dolore alienum ius ea. Atqui congue decore ne pro, sanctus tibique repudiandae his ut, sed justo quando pertinax ne. Fastidii pericula necessitatibus pri ea. Ius ex agam soluta platonem.

Eu sea movet sonet. Cu mel autem libris, pertinax sententiae moderatius vix an. Vis prima graeco delicatissimi et, no pri animal civibus. Wisi nonumy fastidii eum te. Vel ei natum mutat vulputate, in equidem mediocritatem mel.

Sea te elitr saepe. Animal accusamus per in, nam ad sint error veritus. Vis ea causae iuvaret. Mei at stet omnis maiorum. Eos ea solum invidunt aliquando, mandamus disputando nam ea.

Cu illud errem discere has, dolorum philosophia sed at. In enim consequat percipitur usu, at tollit alienum eos, primis signiferumque per cu. Gloriatur persecuti pro et. In illum persius dolores nam, per mentitum convenire dissentiunt ut.

Ex nec assum possit. Dicam nemore putant eu vim, eum scaevola ocurreret cu, nibh probo graeci cum at. Graeci praesent gubergren at est, tale nostrum partiendo sea ad, eos affert commodo theophrastus ex. Cu homero democritum eam. Cu eos suscipit complectitur, everti vidisse mnesarchum eos id. Ad ius illum ullamcorper.

Eu has affert everti probatus, no vel nemore maiestatis neglegentur, pro elit dicit feugait ad. Diam vide cibo mea ad, pro no diam scripta platonem. Duo ne nisl eirmod aeterno. Vim ad nonumes assentior. Nec ea facete facilis, et nec epicurei insolens. Qui dolorum accumsan copiosae id, singulis consequat eu pri.

Sit ei bonorum insolens molestiae, nam te saepe reprehendunt. Mea adhuc ceteros propriae eu. In rebum repudiare sententiae per, id tation prompta vel. Eum ei vide invidunt adipiscing, mei tota dolorum inermis ut.

Rebum ceteros ut sed, debet efficiantur pro ad, sale quodsi vituperatoribus eu ius. Ei etiam eleifend temporibus qui, vix tollit audire iisque at. Veniam menandri adipiscing vim ea, ancillae invenire elaboraret his no, ius antiopam consectetuer in. Brute dicat essent pri an. An magna splendide vel, sint sonet delicatissimi duo no.

Veri brute delicata vim eu, iudico minimum theophrastus an vim. Has laoreet minimum mandamus et, no eos ferri splendide. Ne vis tale malis, vis iusto voluptua tractatos at. Duo an rationibus argumentum, legendos abhorreant pri te.

Te debet dicit persius vim, te viderer sententiae incorrupte sea. Dicunt volumus disputando at duo. Cu eius forensibus disputando eam. Doming interpretaris ex pro, te pro laudem iisque explicari, usu ex postea scripta omittam.

Ut eam maiorum pertinacia accommodare, cu dicta mundi eleifend eos. Mel modus perfecto ea, sint putant sadipscing pro ut. Ea has illud impedit, tantas docendi mentitum eam te. Sed ad quas numquam, mea id posse eloquentiam. Vel eu officiis splendide, dicit inimicus mea te, ex dicant invidunt usu.

Numquam propriae percipitur te sea, probo tritani mel an, vix maiorum accusamus ullamcorper ut. Per ei veniam graeco repudiandae. Sit no propriae periculis. Vel te probo intellegat. Vis ad dicat tractatos, vix vero feugait ei, ad nam laboramus sadipscing.

Id tincidunt sadipscing suscipiantur eam, ad cum persius accusamus. Adhuc feugait forensibus est ad, sed at quaestio periculis. Erant scripta voluptatum et sit. Id dignissim suscipiantur sit, quo ut quem recusabo abhorreant, adhuc mnesarchum moderatius an eam. Cu bonorum intellegebat eos, est no albucius conceptam interpretaris, et graeco scripta tamquam mel. Graeco mnesarchum per at, sit in porro solet scripta.

Est tacimates consectetuer et, cum discere fastidii recteque ut. Ei per malis putant sensibus, timeam democritum ius at. Saperet suscipiantur te mea, ei facer voluptatibus ius, meis facete invenire his ei. Per cu utroque facilisi, te quando scriptorem liberavisse vis, option persecuti pertinacia ad cum. Zril commodo ad per, ne dolor dicam deserunt sit, erroribus repudiare philosophia vel ex.
`

stories.addDecorator(StoryRouter()).add('TNDisplay', () => {
  const textLab = 'termsAndNoticesText'
  const textVal = text(textLab, sampleText)
  const agreeLoadingVal = boolean('agreeLoading', false)

  const typeLab = 'type'
  const typeDef = ['agree', 'opt-out']
  const typeValue = select(typeLab, typeDef)

  return (
    <TNDisplay
      agreeLoading={agreeLoadingVal}
      type={typeValue}
      text={textVal}
      onAgree={() => alert('clicked agree')}
      onDisagree={() => alert('clicked disagree')}
    />
  )
})
