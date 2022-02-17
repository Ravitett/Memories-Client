import React from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const AboutUs = () => {
    return (
        <Card sx={{
            height: 1,
            p:2
        }} 
        style={{
            overflowY: "scroll"
        }}>
            <Typography><br></br>
            <i>על ידי הקלקה על סימון הזיכרון במפה יחשפו בפניכם נבכי נשמתם של חיילים רבים מתקופות שונות.</i><br></br>
            </Typography><br></br>
            <Typography variant='h3' >מי אנחנו?</Typography><br></br>
            <Typography>
            `זיכרונות` היא פלטפורמה חברתית לשיתוף של זיכרונות וחוויות מהשירות הצבאי לפי מיקום וזמן, הפלטפורמה נועדה על מנת לספק מקום לחיילים ומשוחררים החווים פוסט טראומה לשתף את שעל ליבם, למצוא את הכוח בסיפוריהם של אחרים ולחזק האחד את השני.
            </Typography><br></br>
            <Typography>
                החזון שלנו הוא לתת פלטפורמה לשיתוף  אנונימי של חוויות צבאיות מפיהם של החיילים עצמם.
                ‘זיכרונות’ שמה במרכז את חיילי צה"ל ומאפשרת לאזרחים להיחשף לאירועים שחיילינו עברו, לרגשות שחוו וחווים עד היום ולהבין ולו במעט את מה שחוו במהלך שירותם הצבאי ועד היום.
            </Typography><br></br>
            <Typography>
                הזיכרונות של חיילינו מרכיבים סיפור עשיר של תקופות, מקומות ואנשים שלא נכנסו לספרי ההיסטוריה, שיתוף של הזיכרונות האלה יוצר ספר היסטוריה חדש – כזה שנותן ביטוי לכולם.
            </Typography><br></br>
            <Typography>
                כל הזיכרונות משותפים יחד על גבי מפת ישראל והמזרח התיכון, כל זיכרון הוא אישי ונכתב על ידי חייל או איש מילואים על רגע מהיום-יום או אירוע משמעותי.
            </Typography><br></br>
            <Typography>
                <b>אנו מעודדים אתכם להוסיף ולשתף ולפרסם את סיפורכם, מחשבותיכם ורגשותיכם כאן.</b>
            </Typography>
        </Card>
    )
}

export default AboutUs