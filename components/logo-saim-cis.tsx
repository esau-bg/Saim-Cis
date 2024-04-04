'use client'

export default function LogoSaimCis ({ className = 'mr-2 h-6 w-6' }: { className?: string }) {
  return (
    <div className="w-8">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 201" fill="none">
      <path d="M162.495 38.2742H37.6011V163.168H162.495V38.2742Z" fill="white"/>
      <mask id="mask0_1714_14" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="201">
        <path d="M199.796 0.789307H0V200.622H199.796V0.789307Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_1714_14)">
        <mask id="mask1_1714_14" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="1" width="199" height="200">
          <path d="M80.6347 46.6985V81.6379H45.6969C41.8586 81.6379 38.7173 84.7776 38.7173 88.6159V112.386C38.7173 116.224 41.8586 119.364 45.6969 119.364H80.6347V154.303C80.6347 158.141 83.776 161.281 87.6143 161.281H111.383C115.221 161.281 118.362 158.141 118.362 154.303V119.364H153.302C157.141 119.364 160.281 116.224 160.281 112.386V88.6159C160.281 84.7776 157.141 81.6379 153.302 81.6379H118.362V46.6985C118.362 42.8601 115.221 39.7204 111.383 39.7204H87.6143C83.776 39.7204 80.6347 42.8601 80.6347 46.6985ZM11.8443 0.999996H99.5C154.225 0.999996 199 45.7755 199 100.502V188.156C199 194.671 193.669 200.002 187.154 200.002H99.5C44.7739 200.002 0 155.226 0 100.502V12.8459C0 6.33099 5.3294 0.999996 11.8443 0.999996Z" fill="white"/>
        </mask>
        <g mask="url(#mask1_1714_14)">
          <path d="M199 0.999996H0V200H199V0.999996Z" fill="url(#paint0_linear_1714_14)"/>
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear_1714_14" x1="218.9" y1="237.81" x2="-9.95" y2="-24.87" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FA2FF"/>
          <stop offset="0.5" stopColor="#12D8FA"/>
          <stop offset="1" stopColor="#A6FFCB"/>
        </linearGradient>
      </defs>
    </svg>
    </div>
  )
}
