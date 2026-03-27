# 🏌️ Premium Golf & Charity UI Component Library

> An extraordinary collection of premium golf and charity-themed components designed for luxury and impact.

## 🎨 Brand Colors

```
- **Soft Green**: #90c890 (Charity primary)
- **Soft Lavender**: #9d84b7 (Premium primary)
- **Soft Rose**: #d4949e (Charity secondary)
- **Warm Gold**: #d4a574 (Achievement)
- **Light Cream Background**: #f0f5f0 (Base)
```

## 🏆 Premium Components

### 1. **Charity Badge**
Display charity involvement badges with animated heart pulse.

```jsx
<div className="charity-badge">
  <Heart className="w-5 h-5 text-rose-DEFAULT" />
  <span>Charity Golf Movement</span>
</div>
```

**Features:**
- Heart pulse animation
- Hover elevation effect
- Professional styling

---

### 2. **Impact Badge**
Show impact metrics with shine animation.

```jsx
<div className="impact-badge">
  <p className="text-3xl font-black text-green-pop">1:1</p>
  <p className="text-xs font-semibold">Score to Donation Ratio</p>
</div>
```

**Features:**
- Animated shine effect
- Premium gradient background
- Statistics display

---

### 3. **Trophy Card**
Showcase achievements with elegant styling.

```jsx
<div className="trophy-card">
  <Trophy className="w-6 h-6 text-gold-DEFAULT" />
  <div>
    <p>Championship Ready</p>
    <p>Elite Tournament</p>
  </div>
</div>
```

**Features:**
- Top gradient line
- Soft shadows
- Luxury feel

---

### 4. **Leaderboard Rank**
Premium player ranking display.

```jsx
<div className="leaderboard-rank top-1">
  <span>#1</span>
  <!-- Player details -->
</div>
```

**Rank Classes:**
- `top-1` - Gold gradient
- `top-2` - Silver gradient
- `top-3` - Bronze gradient

---

### 5. **Golf Score Display**
Premium score showcase with gradient text.

```jsx
<div className="golf-score-display">
  <p className="text-xs text-gray-600">SCORE</p>
  <p className="score-number">68</p>
</div>
```

**Features:**
- Dual gradient background
- Premium shadow effects
- Prominent display

---

### 6. **Stat Card Premium**
High-impact statistics display.

```jsx
<div className="stat-card-premium">
  <div className="golf-club-badge">
    <Trophy className="w-6 h-6" />
  </div>
  <p className="text-4xl font-black">500+</p>
</div>
```

**Features:**
- Hover lift animation
- Top gradient border
- Glass morphism effect

---

### 7. **Golf Club Badge**
Icon badge for golf-related elements.

```jsx
<div className="golf-club-badge">
  <!-- Icon inside -->
</div>
```

**Features:**
- Skewed golf club design
- Self-contained design
- Shadow effects

---

### 8. **Pin Achievement**
Flag pin visual for achievements.

```jsx
<div className="pin-achievement"></div>
```

**Features:**
- 3D appearance
- Realistic flag design
- Glow shadows

---

### 9. **Prize Ribbon**
Highlight special achievements.

```jsx
<div className="prize-ribbon">
  ✨ Every Score Contributes to Real Change ✨
</div>
```

**Features:**
- Angled ribbon ends
- Gradient background
- Premium typography

---

### 10. **Charity Heart**
Animated heart element for charity context.

```jsx
<div className="charity-heart"></div>
```

**Features:**
- Pulsing animation
- Charity rose color
- Glow effect

---

## 🎯 Premium Components

### PremiumGolfCharityHero
Full-page hero section showcasing golf and charity.

```jsx
import { PremiumGolfCharityHero } from '@/components/home/PremiumGolfCharityHero';

<PremiumGolfCharityHero 
  title="Golf For Good"
  subtitle="Where Every Shot Makes a Difference"
  showAnimations={true}
/>
```

**Includes:**
- Animated background orbs
- Charity badge
- Stats grid with golf club icons
- Achievement badges
- Call-to-action buttons
- Prize ribbon

---

### PremiumLeaderboard
Tournament leaderboard with rankings and donations.

```jsx
import { PremiumLeaderboard } from '@/components/home/PremiumLeaderboard';

<PremiumLeaderboard />
```

**Features:**
- Rank-based styling (Gold/Silver/Bronze)
- Score display cards
- Donation amounts
- Achievement icons
- Staggered animations

---

### PremiumAchievements
Achievement showcase with unlock mechanics.

```jsx
import { PremiumAchievements } from '@/components/home/PremiumAchievements';

<PremiumAchievements />
```

**Features:**
- 6 showcase achievements
- Emoji badges
- Unlock buttons
- Statistics grid
- Call-to-action

---

## 🎨 CSS Classes Quick Reference

| Class | Purpose | Example |
|-------|---------|---------|
| `charity-badge` | Charity display badge | Charity movement labels |
| `impact-badge` | Impact metrics | Score ratios, donations |
| `trophy-card` | Achievement card | Premium display |
| `leaderboard-rank` | Player ranking | Tournament standings |
| `golf-score-display` | Score showcase | Game scores |
| `stat-card-premium` | Statistics | Tournament stats |
| `golf-club-badge` | Icon badge | Element highlights |
| `pin-achievement` | Flag pin | Achievement markers |
| `prize-ribbon` | Special highlight | Featured content |
| `charity-heart` | Heart animation | Donation indicators |
| `golf-fairway` | Fairway background | Card backgrounds |
| `golf-scorecard` | Scorecard style | Grid patterns |
| `golf-flag-accent` | Flag marker | Content markers |

---

## 🎭 Interactive Features

All components include:
- ✨ Smooth hover animations
- 📱 Responsive design
- 🎨 Glass morphism effects
- 💫 Framer Motion animations
- 🌈 Premium gradients
- ✨ Subtle shadows and glows

---

## 🚀 Usage in Pages

### Home Page
```jsx
import { PremiumGolfCharityHero } from '@/components/home/PremiumGolfCharityHero';
import { PremiumLeaderboard } from '@/components/home/PremiumLeaderboard';
import { PremiumAchievements } from '@/components/home/PremiumAchievements';

export default function Home() {
  return (
    <main>
      <PremiumGolfCharityHero />
      <PremiumLeaderboard />
      <PremiumAchievements />
    </main>
  );
}
```

---

## 🎯 Design Philosophy

1. **Light & Soft** - Cream background with pastel tones
2. **Premium** - Luxury materials feel (glass, shadows, gradients)
3. **Golf-Themed** - Fairways, pins, scorecard patterns
4. **Charity-Focused** - Hearts, impact badges, donation displays
5. **Accessible** - Clear hierarchy and readable typography
6. **Animated** - Smooth, purposeful motion
7. **Professional** - Trustworthy and elegant

---

## 💡 Pro Tips

1. **Color Combinations:**
   - Green + Lavender = Natural + Premium
   - Gold + Rose = Achievement + Warmth
   - Cream + Shadows = Luxury + Elegance

2. **Animation Patterns:**
   - Use `float-slow` for subtle continuous motion
   - Apply `hover:translateY(-8px)` for lift effect
   - Implement shimmer animations on badges

3. **Spacing:**
   - Use `gap-6` or `gap-8` between components
   - Maintain consistent `p-24` padding on major sections
   - Apply `py-20` to section vertical spacing

4. **Typography:**
   - Headlines: `text-5xl font-black`
   - Subheadings: `text-lg font-bold`
   - Labels: `text-xs uppercase tracking-wider`

---

**Component Library Version**: 1.0  
**Last Updated**: March 2026  
**Theme**: Premium Soft Luxury Golf Charity
